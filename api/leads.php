<?php
/**
 * Leads API Endpoint
 *
 * GET    /api/leads        - List leads
 * GET    /api/leads?id=X   - Get single lead
 * GET    /api/leads?export=csv - Export leads
 * POST   /api/leads        - Create lead
 * PUT    /api/leads        - Update lead
 * DELETE /api/leads?id=X   - Delete lead
 */

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

requireAuth();

$method = getMethod();
$input = getJsonInput();
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

switch ($method) {
    case 'GET':
        if (isset($_GET['export']) && $_GET['export'] === 'csv') {
            exportLeads();
        } elseif ($id) {
            getLead($id);
        } else {
            listLeads();
        }
        break;

    case 'POST':
        requireCsrf();
        createLead($input);
        break;

    case 'PUT':
        requireCsrf();
        updateLead($input);
        break;

    case 'DELETE':
        requireCsrf();
        if (!$id) {
            jsonResponse(['ok' => false, 'error' => 'ID required'], 400);
        }
        deleteLead($id);
        break;

    default:
        jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
}

function listLeads(): void {
    $db = getDB();
    $pagination = getPagination();
    $currentUser = getCurrentUser();

    // Build query with filters
    $where = [];
    $params = [];

    // Search filter
    if (!empty($_GET['search'])) {
        $search = '%' . $_GET['search'] . '%';
        $where[] = '(l.name LIKE ? OR l.email LIKE ? OR l.company_name LIKE ?)';
        $params[] = $search;
        $params[] = $search;
        $params[] = $search;
    }

    // Status filter
    if (!empty($_GET['status'])) {
        $where[] = 'l.status = ?';
        $params[] = $_GET['status'];
    }

    // Priority filter
    if (!empty($_GET['priority'])) {
        $where[] = 'l.priority = ?';
        $params[] = $_GET['priority'];
    }

    // Source filter
    if (!empty($_GET['source'])) {
        $where[] = 'l.source = ?';
        $params[] = $_GET['source'];
    }

    // Owner filter (non-admins can only see their own leads or unassigned)
    if (!empty($_GET['owner_id'])) {
        $where[] = 'l.owner_id = ?';
        $params[] = (int)$_GET['owner_id'];
    }

    $whereClause = !empty($where) ? 'WHERE ' . implode(' AND ', $where) : '';

    // Get total count
    $stmt = $db->prepare("SELECT COUNT(*) FROM leads l $whereClause");
    $stmt->execute($params);
    $total = (int)$stmt->fetchColumn();

    // Get leads with owner info
    $orderBy = $_GET['sort'] ?? 'created_at';
    $orderDir = strtoupper($_GET['order'] ?? 'DESC') === 'ASC' ? 'ASC' : 'DESC';
    $allowedSort = ['name', 'status', 'priority', 'score', 'next_action_date', 'created_at', 'updated_at'];
    if (!in_array($orderBy, $allowedSort)) {
        $orderBy = 'created_at';
    }

    $sql = "
        SELECT l.*,
               u.first_name AS owner_first_name,
               u.last_name AS owner_last_name,
               c.name AS company_name_linked
        FROM leads l
        LEFT JOIN users u ON l.owner_id = u.id
        LEFT JOIN companies c ON l.company_id = c.id
        $whereClause
        ORDER BY l.$orderBy $orderDir
        LIMIT ? OFFSET ?
    ";

    $params[] = $pagination['per_page'];
    $params[] = $pagination['offset'];

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $leads = $stmt->fetchAll();

    jsonResponse(paginatedResponse($leads, $total, $pagination));
}

function getLead(int $id): void {
    $db = getDB();

    $stmt = $db->prepare('
        SELECT l.*,
               u.first_name AS owner_first_name,
               u.last_name AS owner_last_name,
               u.email AS owner_email,
               c.name AS company_name_linked,
               ct.first_name AS contact_first_name,
               ct.last_name AS contact_last_name
        FROM leads l
        LEFT JOIN users u ON l.owner_id = u.id
        LEFT JOIN companies c ON l.company_id = c.id
        LEFT JOIN contacts ct ON l.contact_id = ct.id
        WHERE l.id = ?
    ');
    $stmt->execute([$id]);
    $lead = $stmt->fetch();

    if (!$lead) {
        jsonResponse(['ok' => false, 'error' => 'Lead not found'], 404);
    }

    // Get related notes
    $stmt = $db->prepare('
        SELECT n.*, u.first_name, u.last_name
        FROM notes n
        LEFT JOIN users u ON n.created_by = u.id
        WHERE n.entity_type = "lead" AND n.entity_id = ?
        ORDER BY n.is_pinned DESC, n.created_at DESC
        LIMIT 10
    ');
    $stmt->execute([$id]);
    $lead['notes'] = $stmt->fetchAll();

    // Get related tasks
    $stmt = $db->prepare('
        SELECT t.*, u.first_name AS assignee_first_name, u.last_name AS assignee_last_name
        FROM tasks t
        LEFT JOIN users u ON t.assigned_to = u.id
        WHERE t.lead_id = ?
        ORDER BY t.due_date ASC
        LIMIT 5
    ');
    $stmt->execute([$id]);
    $lead['tasks'] = $stmt->fetchAll();

    // Get related deals
    $stmt = $db->prepare('
        SELECT id, name, stage, amount, probability
        FROM deals
        WHERE lead_id = ?
        ORDER BY created_at DESC
        LIMIT 5
    ');
    $stmt->execute([$id]);
    $lead['deals'] = $stmt->fetchAll();

    jsonResponse(['ok' => true, 'data' => $lead]);
}

function createLead(array $input): void {
    $errors = validate($input, [
        'name' => ['required' => true, 'max_length' => 255],
        'email' => ['email' => true, 'max_length' => 255],
        'status' => ['in' => ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost']],
        'priority' => ['in' => ['low', 'medium', 'high', 'urgent']],
        'score' => ['numeric' => true],
        'next_action_date' => ['date' => true],
        'last_contact_date' => ['date' => true],
    ]);

    if (!empty($errors)) {
        jsonResponse(['ok' => false, 'error' => 'validation_failed', 'data' => $errors], 400);
    }

    $db = getDB();
    $currentUser = getCurrentUser();

    $stmt = $db->prepare('
        INSERT INTO leads (
            name, email, phone, company_name, status, source, priority, score,
            next_action_date, last_contact_date, notes, company_id, contact_id,
            owner_id, created_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ');

    $stmt->execute([
        sanitize($input['name']),
        sanitize($input['email'] ?? null),
        sanitize($input['phone'] ?? null),
        sanitize($input['company_name'] ?? null),
        $input['status'] ?? 'new',
        $input['source'] ?? null,
        $input['priority'] ?? 'medium',
        (int)($input['score'] ?? 0),
        $input['next_action_date'] ?? null,
        $input['last_contact_date'] ?? null,
        sanitize($input['notes'] ?? null),
        !empty($input['company_id']) ? (int)$input['company_id'] : null,
        !empty($input['contact_id']) ? (int)$input['contact_id'] : null,
        !empty($input['owner_id']) ? (int)$input['owner_id'] : $currentUser['id'],
        $currentUser['id'],
    ]);

    $leadId = (int)$db->lastInsertId();

    logActivity('lead_created', "Created lead: {$input['name']}", 'lead', $leadId);

    jsonResponse([
        'ok' => true,
        'data' => ['id' => $leadId, 'message' => 'lead_created'],
    ], 201);
}

function updateLead(array $input): void {
    $id = (int)($input['id'] ?? 0);
    if (!$id) {
        jsonResponse(['ok' => false, 'error' => 'ID required'], 400);
    }

    $db = getDB();

    // Check if lead exists
    $stmt = $db->prepare('SELECT id, status FROM leads WHERE id = ?');
    $stmt->execute([$id]);
    $existingLead = $stmt->fetch();

    if (!$existingLead) {
        jsonResponse(['ok' => false, 'error' => 'Lead not found'], 404);
    }

    $errors = validate($input, [
        'name' => ['max_length' => 255],
        'email' => ['email' => true, 'max_length' => 255],
        'status' => ['in' => ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost']],
        'priority' => ['in' => ['low', 'medium', 'high', 'urgent']],
        'score' => ['numeric' => true],
        'next_action_date' => ['date' => true],
        'last_contact_date' => ['date' => true],
    ]);

    if (!empty($errors)) {
        jsonResponse(['ok' => false, 'error' => 'validation_failed', 'data' => $errors], 400);
    }

    // Build update query
    $updates = [];
    $params = [];

    $fields = ['name', 'email', 'phone', 'company_name', 'status', 'source', 'priority', 'notes'];
    foreach ($fields as $field) {
        if (isset($input[$field])) {
            $updates[] = "$field = ?";
            $params[] = sanitize($input[$field]);
        }
    }

    $numericFields = ['score', 'company_id', 'contact_id', 'owner_id'];
    foreach ($numericFields as $field) {
        if (isset($input[$field])) {
            $updates[] = "$field = ?";
            $params[] = $input[$field] !== '' ? (int)$input[$field] : null;
        }
    }

    $dateFields = ['next_action_date', 'last_contact_date'];
    foreach ($dateFields as $field) {
        if (isset($input[$field])) {
            $updates[] = "$field = ?";
            $params[] = $input[$field] ?: null;
        }
    }

    if (empty($updates)) {
        jsonResponse(['ok' => false, 'error' => 'no_changes'], 400);
    }

    $params[] = $id;
    $sql = 'UPDATE leads SET ' . implode(', ', $updates) . ' WHERE id = ?';
    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    // Log status change
    if (isset($input['status']) && $input['status'] !== $existingLead['status']) {
        logActivity(
            'lead_status_changed',
            "Lead status changed: {$existingLead['status']} -> {$input['status']}",
            'lead',
            $id
        );
    } else {
        logActivity('lead_updated', "Updated lead ID: $id", 'lead', $id);
    }

    jsonResponse(['ok' => true, 'data' => ['message' => 'lead_updated']]);
}

function deleteLead(int $id): void {
    $db = getDB();

    $stmt = $db->prepare('SELECT id FROM leads WHERE id = ?');
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        jsonResponse(['ok' => false, 'error' => 'Lead not found'], 404);
    }

    // Delete lead (notes will cascade, but nullify deals reference)
    $db->beginTransaction();
    try {
        $db->prepare('UPDATE deals SET lead_id = NULL WHERE lead_id = ?')->execute([$id]);
        $db->prepare('DELETE FROM notes WHERE entity_type = "lead" AND entity_id = ?')->execute([$id]);
        $db->prepare('UPDATE tasks SET lead_id = NULL WHERE lead_id = ?')->execute([$id]);
        $db->prepare('DELETE FROM leads WHERE id = ?')->execute([$id]);
        $db->commit();
    } catch (Exception $e) {
        $db->rollBack();
        throw $e;
    }

    logActivity('lead_deleted', "Deleted lead ID: $id");

    jsonResponse(['ok' => true, 'data' => ['message' => 'lead_deleted']]);
}

function exportLeads(): void {
    global $config;

    if (!($config['features']['export_csv'] ?? true)) {
        jsonResponse(['ok' => false, 'error' => 'Export disabled'], 403);
    }

    $db = getDB();

    $stmt = $db->query('
        SELECT l.name, l.email, l.phone, l.company_name, l.status, l.source,
               l.priority, l.score, l.next_action_date, l.last_contact_date,
               CONCAT(u.first_name, " ", u.last_name) AS owner,
               l.created_at
        FROM leads l
        LEFT JOIN users u ON l.owner_id = u.id
        ORDER BY l.created_at DESC
    ');
    $leads = $stmt->fetchAll();

    // Generate CSV
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="leads_' . date('Y-m-d') . '.csv"');

    $output = fopen('php://output', 'w');

    // BOM for Excel UTF-8 compatibility
    fprintf($output, chr(0xEF) . chr(0xBB) . chr(0xBF));

    // Headers
    fputcsv($output, ['Name', 'Email', 'Phone', 'Company', 'Status', 'Source', 'Priority', 'Score', 'Next Action', 'Last Contact', 'Owner', 'Created']);

    // Data
    foreach ($leads as $lead) {
        fputcsv($output, [
            $lead['name'],
            $lead['email'],
            $lead['phone'],
            $lead['company_name'],
            $lead['status'],
            $lead['source'],
            $lead['priority'],
            $lead['score'],
            $lead['next_action_date'],
            $lead['last_contact_date'],
            $lead['owner'],
            $lead['created_at'],
        ]);
    }

    fclose($output);

    logActivity('leads_exported', 'Exported leads to CSV');
    exit;
}
