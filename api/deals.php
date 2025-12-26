<?php
/**
 * Deals API Endpoint
 *
 * GET    /api/deals        - List deals
 * GET    /api/deals?id=X   - Get single deal
 * GET    /api/deals?export=csv - Export deals
 * GET    /api/deals?pipeline=1 - Get pipeline view
 * POST   /api/deals        - Create deal
 * PUT    /api/deals        - Update deal
 * DELETE /api/deals?id=X   - Delete deal
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
            exportDeals();
        } elseif (isset($_GET['pipeline'])) {
            getPipeline();
        } elseif ($id) {
            getDeal($id);
        } else {
            listDeals();
        }
        break;

    case 'POST':
        requireCsrf();
        createDeal($input);
        break;

    case 'PUT':
        requireCsrf();
        updateDeal($input);
        break;

    case 'DELETE':
        requireCsrf();
        if (!$id) {
            jsonResponse(['ok' => false, 'error' => 'ID required'], 400);
        }
        deleteDeal($id);
        break;

    default:
        jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
}

function listDeals(): void {
    $db = getDB();
    $pagination = getPagination();

    $where = [];
    $params = [];

    // Search filter
    if (!empty($_GET['search'])) {
        $search = '%' . $_GET['search'] . '%';
        $where[] = '(d.name LIKE ? OR c.name LIKE ?)';
        $params[] = $search;
        $params[] = $search;
    }

    // Stage filter
    if (!empty($_GET['stage'])) {
        $where[] = 'd.stage = ?';
        $params[] = $_GET['stage'];
    }

    // Owner filter
    if (!empty($_GET['owner_id'])) {
        $where[] = 'd.owner_id = ?';
        $params[] = (int)$_GET['owner_id'];
    }

    // Amount range
    if (!empty($_GET['min_amount'])) {
        $where[] = 'd.amount >= ?';
        $params[] = (float)$_GET['min_amount'];
    }
    if (!empty($_GET['max_amount'])) {
        $where[] = 'd.amount <= ?';
        $params[] = (float)$_GET['max_amount'];
    }

    $whereClause = !empty($where) ? 'WHERE ' . implode(' AND ', $where) : '';

    // Get total count
    $stmt = $db->prepare("
        SELECT COUNT(*)
        FROM deals d
        LEFT JOIN companies c ON d.company_id = c.id
        $whereClause
    ");
    $stmt->execute($params);
    $total = (int)$stmt->fetchColumn();

    // Get deals
    $orderBy = $_GET['sort'] ?? 'created_at';
    $orderDir = strtoupper($_GET['order'] ?? 'DESC') === 'ASC' ? 'ASC' : 'DESC';
    $allowedSort = ['name', 'stage', 'amount', 'probability', 'expected_close_date', 'created_at'];
    if (!in_array($orderBy, $allowedSort)) {
        $orderBy = 'created_at';
    }

    $sql = "
        SELECT d.*,
               u.first_name AS owner_first_name,
               u.last_name AS owner_last_name,
               c.name AS company_name,
               l.name AS lead_name
        FROM deals d
        LEFT JOIN users u ON d.owner_id = u.id
        LEFT JOIN companies c ON d.company_id = c.id
        LEFT JOIN leads l ON d.lead_id = l.id
        $whereClause
        ORDER BY d.$orderBy $orderDir
        LIMIT ? OFFSET ?
    ";

    $params[] = $pagination['per_page'];
    $params[] = $pagination['offset'];

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $deals = $stmt->fetchAll();

    jsonResponse(paginatedResponse($deals, $total, $pagination));
}

function getPipeline(): void {
    global $config;

    $db = getDB();
    $stages = $config['crm']['deal_stages'] ?? [];

    $pipeline = [];
    foreach ($stages as $stageKey => $stageConfig) {
        $stmt = $db->prepare('
            SELECT d.*,
                   u.first_name AS owner_first_name,
                   u.last_name AS owner_last_name,
                   c.name AS company_name
            FROM deals d
            LEFT JOIN users u ON d.owner_id = u.id
            LEFT JOIN companies c ON d.company_id = c.id
            WHERE d.stage = ?
            ORDER BY d.expected_close_date ASC, d.amount DESC
        ');
        $stmt->execute([$stageKey]);
        $deals = $stmt->fetchAll();

        $totalAmount = array_sum(array_column($deals, 'amount'));
        $weightedAmount = 0;
        foreach ($deals as $deal) {
            $weightedAmount += $deal['amount'] * ($deal['probability'] / 100);
        }

        $pipeline[$stageKey] = [
            'label' => $stageConfig['label'],
            'order' => $stageConfig['order'],
            'default_probability' => $stageConfig['probability'],
            'deals' => $deals,
            'count' => count($deals),
            'total_amount' => $totalAmount,
            'weighted_amount' => $weightedAmount,
        ];
    }

    // Sort by order
    uasort($pipeline, fn($a, $b) => $a['order'] <=> $b['order']);

    jsonResponse(['ok' => true, 'data' => $pipeline]);
}

function getDeal(int $id): void {
    $db = getDB();

    $stmt = $db->prepare('
        SELECT d.*,
               u.first_name AS owner_first_name,
               u.last_name AS owner_last_name,
               u.email AS owner_email,
               c.name AS company_name,
               l.name AS lead_name,
               ct.first_name AS contact_first_name,
               ct.last_name AS contact_last_name
        FROM deals d
        LEFT JOIN users u ON d.owner_id = u.id
        LEFT JOIN companies c ON d.company_id = c.id
        LEFT JOIN leads l ON d.lead_id = l.id
        LEFT JOIN contacts ct ON d.contact_id = ct.id
        WHERE d.id = ?
    ');
    $stmt->execute([$id]);
    $deal = $stmt->fetch();

    if (!$deal) {
        jsonResponse(['ok' => false, 'error' => 'Deal not found'], 404);
    }

    // Get related notes
    $stmt = $db->prepare('
        SELECT n.*, u.first_name, u.last_name
        FROM notes n
        LEFT JOIN users u ON n.created_by = u.id
        WHERE n.entity_type = "deal" AND n.entity_id = ?
        ORDER BY n.is_pinned DESC, n.created_at DESC
        LIMIT 10
    ');
    $stmt->execute([$id]);
    $deal['notes'] = $stmt->fetchAll();

    // Get related tasks
    $stmt = $db->prepare('
        SELECT t.*, u.first_name AS assignee_first_name, u.last_name AS assignee_last_name
        FROM tasks t
        LEFT JOIN users u ON t.assigned_to = u.id
        WHERE t.deal_id = ?
        ORDER BY t.due_date ASC
        LIMIT 5
    ');
    $stmt->execute([$id]);
    $deal['tasks'] = $stmt->fetchAll();

    jsonResponse(['ok' => true, 'data' => $deal]);
}

function createDeal(array $input): void {
    global $config;

    $validStages = array_keys($config['crm']['deal_stages'] ?? []);

    $errors = validate($input, [
        'name' => ['required' => true, 'max_length' => 255],
        'stage' => ['in' => $validStages],
        'amount' => ['numeric' => true],
        'probability' => ['numeric' => true],
        'expected_close_date' => ['date' => true],
    ]);

    if (!empty($errors)) {
        jsonResponse(['ok' => false, 'error' => 'validation_failed', 'data' => $errors], 400);
    }

    $db = getDB();
    $currentUser = getCurrentUser();

    // Get default probability from stage
    $stage = $input['stage'] ?? 'prospecting';
    $defaultProbability = $config['crm']['deal_stages'][$stage]['probability'] ?? 0;

    $stmt = $db->prepare('
        INSERT INTO deals (
            name, stage, amount, probability, expected_close_date, description,
            lead_id, company_id, contact_id, owner_id, created_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ');

    $stmt->execute([
        sanitize($input['name']),
        $stage,
        (float)($input['amount'] ?? 0),
        (int)($input['probability'] ?? $defaultProbability),
        $input['expected_close_date'] ?? null,
        sanitize($input['description'] ?? null),
        !empty($input['lead_id']) ? (int)$input['lead_id'] : null,
        !empty($input['company_id']) ? (int)$input['company_id'] : null,
        !empty($input['contact_id']) ? (int)$input['contact_id'] : null,
        !empty($input['owner_id']) ? (int)$input['owner_id'] : $currentUser['id'],
        $currentUser['id'],
    ]);

    $dealId = (int)$db->lastInsertId();

    logActivity('deal_created', "Created deal: {$input['name']}", 'deal', $dealId);

    jsonResponse([
        'ok' => true,
        'data' => ['id' => $dealId, 'message' => 'deal_created'],
    ], 201);
}

function updateDeal(array $input): void {
    global $config;

    $id = (int)($input['id'] ?? 0);
    if (!$id) {
        jsonResponse(['ok' => false, 'error' => 'ID required'], 400);
    }

    $db = getDB();

    $stmt = $db->prepare('SELECT id, stage, amount FROM deals WHERE id = ?');
    $stmt->execute([$id]);
    $existingDeal = $stmt->fetch();

    if (!$existingDeal) {
        jsonResponse(['ok' => false, 'error' => 'Deal not found'], 404);
    }

    $validStages = array_keys($config['crm']['deal_stages'] ?? []);

    $errors = validate($input, [
        'name' => ['max_length' => 255],
        'stage' => ['in' => $validStages],
        'amount' => ['numeric' => true],
        'probability' => ['numeric' => true],
        'expected_close_date' => ['date' => true],
    ]);

    if (!empty($errors)) {
        jsonResponse(['ok' => false, 'error' => 'validation_failed', 'data' => $errors], 400);
    }

    $updates = [];
    $params = [];

    $stringFields = ['name', 'description'];
    foreach ($stringFields as $field) {
        if (isset($input[$field])) {
            $updates[] = "$field = ?";
            $params[] = sanitize($input[$field]);
        }
    }

    if (isset($input['stage'])) {
        $updates[] = 'stage = ?';
        $params[] = $input['stage'];

        // Set actual_close_date if closed
        if (in_array($input['stage'], ['closed_won', 'closed_lost'])) {
            $updates[] = 'actual_close_date = CURDATE()';
        }
    }

    if (isset($input['amount'])) {
        $updates[] = 'amount = ?';
        $params[] = (float)$input['amount'];
    }

    if (isset($input['probability'])) {
        $updates[] = 'probability = ?';
        $params[] = min(100, max(0, (int)$input['probability']));
    }

    $dateFields = ['expected_close_date'];
    foreach ($dateFields as $field) {
        if (isset($input[$field])) {
            $updates[] = "$field = ?";
            $params[] = $input[$field] ?: null;
        }
    }

    $foreignFields = ['lead_id', 'company_id', 'contact_id', 'owner_id'];
    foreach ($foreignFields as $field) {
        if (isset($input[$field])) {
            $updates[] = "$field = ?";
            $params[] = $input[$field] ? (int)$input[$field] : null;
        }
    }

    if (empty($updates)) {
        jsonResponse(['ok' => false, 'error' => 'no_changes'], 400);
    }

    $params[] = $id;
    $sql = 'UPDATE deals SET ' . implode(', ', $updates) . ' WHERE id = ?';
    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    // Log stage change
    if (isset($input['stage']) && $input['stage'] !== $existingDeal['stage']) {
        logActivity(
            'deal_stage_changed',
            "Deal stage changed: {$existingDeal['stage']} -> {$input['stage']}",
            'deal',
            $id
        );
    } else {
        logActivity('deal_updated', "Updated deal ID: $id", 'deal', $id);
    }

    jsonResponse(['ok' => true, 'data' => ['message' => 'deal_updated']]);
}

function deleteDeal(int $id): void {
    $db = getDB();

    $stmt = $db->prepare('SELECT id FROM deals WHERE id = ?');
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        jsonResponse(['ok' => false, 'error' => 'Deal not found'], 404);
    }

    $db->beginTransaction();
    try {
        $db->prepare('DELETE FROM notes WHERE entity_type = "deal" AND entity_id = ?')->execute([$id]);
        $db->prepare('UPDATE tasks SET deal_id = NULL WHERE deal_id = ?')->execute([$id]);
        $db->prepare('DELETE FROM deals WHERE id = ?')->execute([$id]);
        $db->commit();
    } catch (Exception $e) {
        $db->rollBack();
        throw $e;
    }

    logActivity('deal_deleted', "Deleted deal ID: $id");

    jsonResponse(['ok' => true, 'data' => ['message' => 'deal_deleted']]);
}

function exportDeals(): void {
    global $config;

    if (!($config['features']['export_csv'] ?? true)) {
        jsonResponse(['ok' => false, 'error' => 'Export disabled'], 403);
    }

    $db = getDB();

    $stmt = $db->query('
        SELECT d.name, d.stage, d.amount, d.probability, d.expected_close_date,
               d.actual_close_date, c.name AS company,
               CONCAT(u.first_name, " ", u.last_name) AS owner,
               d.created_at
        FROM deals d
        LEFT JOIN users u ON d.owner_id = u.id
        LEFT JOIN companies c ON d.company_id = c.id
        ORDER BY d.created_at DESC
    ');
    $deals = $stmt->fetchAll();

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="deals_' . date('Y-m-d') . '.csv"');

    $output = fopen('php://output', 'w');
    fprintf($output, chr(0xEF) . chr(0xBB) . chr(0xBF));

    fputcsv($output, ['Name', 'Stage', 'Amount', 'Probability %', 'Expected Close', 'Actual Close', 'Company', 'Owner', 'Created']);

    foreach ($deals as $deal) {
        fputcsv($output, [
            $deal['name'],
            $deal['stage'],
            $deal['amount'],
            $deal['probability'],
            $deal['expected_close_date'],
            $deal['actual_close_date'],
            $deal['company'],
            $deal['owner'],
            $deal['created_at'],
        ]);
    }

    fclose($output);

    logActivity('deals_exported', 'Exported deals to CSV');
    exit;
}
