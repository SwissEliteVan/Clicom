<?php
/**
 * Contacts API Endpoint
 *
 * GET    /api/contacts        - List contacts
 * GET    /api/contacts?id=X   - Get single contact
 * POST   /api/contacts        - Create contact
 * PUT    /api/contacts        - Update contact
 * DELETE /api/contacts?id=X   - Delete contact
 */

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

requireAuth();

$method = getMethod();
$input = getJsonInput();
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

switch ($method) {
    case 'GET':
        if ($id) {
            getContact($id);
        } else {
            listContacts();
        }
        break;

    case 'POST':
        requireCsrf();
        createContact($input);
        break;

    case 'PUT':
        requireCsrf();
        updateContact($input);
        break;

    case 'DELETE':
        requireCsrf();
        if (!$id) {
            jsonResponse(['ok' => false, 'error' => 'ID required'], 400);
        }
        deleteContact($id);
        break;

    default:
        jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
}

function listContacts(): void {
    $db = getDB();
    $pagination = getPagination();

    $where = [];
    $params = [];

    // Search filter
    if (!empty($_GET['search'])) {
        $search = '%' . $_GET['search'] . '%';
        $where[] = '(ct.first_name LIKE ? OR ct.last_name LIKE ? OR ct.email LIKE ? OR c.name LIKE ?)';
        $params[] = $search;
        $params[] = $search;
        $params[] = $search;
        $params[] = $search;
    }

    // Company filter
    if (!empty($_GET['company_id'])) {
        $where[] = 'ct.company_id = ?';
        $params[] = (int)$_GET['company_id'];
    }

    $whereClause = !empty($where) ? 'WHERE ' . implode(' AND ', $where) : '';

    // Get total count
    $stmt = $db->prepare("
        SELECT COUNT(*)
        FROM contacts ct
        LEFT JOIN companies c ON ct.company_id = c.id
        $whereClause
    ");
    $stmt->execute($params);
    $total = (int)$stmt->fetchColumn();

    // Get contacts
    $orderBy = $_GET['sort'] ?? 'last_name';
    $orderDir = strtoupper($_GET['order'] ?? 'ASC') === 'DESC' ? 'DESC' : 'ASC';
    $allowedSort = ['first_name', 'last_name', 'email', 'job_title', 'created_at'];
    if (!in_array($orderBy, $allowedSort)) {
        $orderBy = 'last_name';
    }

    $sql = "
        SELECT ct.*,
               c.name AS company_name,
               u.first_name AS owner_first_name,
               u.last_name AS owner_last_name
        FROM contacts ct
        LEFT JOIN companies c ON ct.company_id = c.id
        LEFT JOIN users u ON ct.owner_id = u.id
        $whereClause
        ORDER BY ct.$orderBy $orderDir
        LIMIT ? OFFSET ?
    ";

    $params[] = $pagination['per_page'];
    $params[] = $pagination['offset'];

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $contacts = $stmt->fetchAll();

    jsonResponse(paginatedResponse($contacts, $total, $pagination));
}

function getContact(int $id): void {
    $db = getDB();

    $stmt = $db->prepare('
        SELECT ct.*,
               c.name AS company_name,
               u.first_name AS owner_first_name,
               u.last_name AS owner_last_name,
               u.email AS owner_email
        FROM contacts ct
        LEFT JOIN companies c ON ct.company_id = c.id
        LEFT JOIN users u ON ct.owner_id = u.id
        WHERE ct.id = ?
    ');
    $stmt->execute([$id]);
    $contact = $stmt->fetch();

    if (!$contact) {
        jsonResponse(['ok' => false, 'error' => 'Contact not found'], 404);
    }

    // Get leads linked to this contact
    $stmt = $db->prepare('
        SELECT id, name, status, priority
        FROM leads
        WHERE contact_id = ?
        ORDER BY created_at DESC
        LIMIT 10
    ');
    $stmt->execute([$id]);
    $contact['leads'] = $stmt->fetchAll();

    // Get deals
    $stmt = $db->prepare('
        SELECT id, name, stage, amount
        FROM deals
        WHERE contact_id = ?
        ORDER BY created_at DESC
        LIMIT 10
    ');
    $stmt->execute([$id]);
    $contact['deals'] = $stmt->fetchAll();

    // Get notes
    $stmt = $db->prepare('
        SELECT n.*, u.first_name, u.last_name
        FROM notes n
        LEFT JOIN users u ON n.created_by = u.id
        WHERE n.entity_type = "contact" AND n.entity_id = ?
        ORDER BY n.is_pinned DESC, n.created_at DESC
        LIMIT 10
    ');
    $stmt->execute([$id]);
    $contact['notes'] = $stmt->fetchAll();

    jsonResponse(['ok' => true, 'data' => $contact]);
}

function createContact(array $input): void {
    $errors = validate($input, [
        'first_name' => ['required' => true, 'max_length' => 100],
        'last_name' => ['required' => true, 'max_length' => 100],
        'email' => ['email' => true, 'max_length' => 255],
    ]);

    if (!empty($errors)) {
        jsonResponse(['ok' => false, 'error' => 'validation_failed', 'data' => $errors], 400);
    }

    $db = getDB();
    $currentUser = getCurrentUser();

    $stmt = $db->prepare('
        INSERT INTO contacts (
            first_name, last_name, email, phone, mobile, job_title,
            company_id, address, notes, owner_id, created_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ');

    $stmt->execute([
        sanitize($input['first_name']),
        sanitize($input['last_name']),
        sanitize($input['email'] ?? null),
        sanitize($input['phone'] ?? null),
        sanitize($input['mobile'] ?? null),
        sanitize($input['job_title'] ?? null),
        !empty($input['company_id']) ? (int)$input['company_id'] : null,
        sanitize($input['address'] ?? null),
        sanitize($input['notes'] ?? null),
        !empty($input['owner_id']) ? (int)$input['owner_id'] : $currentUser['id'],
        $currentUser['id'],
    ]);

    $contactId = (int)$db->lastInsertId();

    logActivity('contact_created', "Created contact: {$input['first_name']} {$input['last_name']}", 'contact', $contactId);

    jsonResponse([
        'ok' => true,
        'data' => ['id' => $contactId, 'message' => 'contact_created'],
    ], 201);
}

function updateContact(array $input): void {
    $id = (int)($input['id'] ?? 0);
    if (!$id) {
        jsonResponse(['ok' => false, 'error' => 'ID required'], 400);
    }

    $db = getDB();

    $stmt = $db->prepare('SELECT id FROM contacts WHERE id = ?');
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        jsonResponse(['ok' => false, 'error' => 'Contact not found'], 404);
    }

    $errors = validate($input, [
        'first_name' => ['max_length' => 100],
        'last_name' => ['max_length' => 100],
        'email' => ['email' => true, 'max_length' => 255],
    ]);

    if (!empty($errors)) {
        jsonResponse(['ok' => false, 'error' => 'validation_failed', 'data' => $errors], 400);
    }

    $updates = [];
    $params = [];

    $fields = ['first_name', 'last_name', 'email', 'phone', 'mobile', 'job_title', 'address', 'notes'];
    foreach ($fields as $field) {
        if (isset($input[$field])) {
            $updates[] = "$field = ?";
            $params[] = sanitize($input[$field]);
        }
    }

    $foreignFields = ['company_id', 'owner_id'];
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
    $sql = 'UPDATE contacts SET ' . implode(', ', $updates) . ' WHERE id = ?';
    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    logActivity('contact_updated', "Updated contact ID: $id", 'contact', $id);

    jsonResponse(['ok' => true, 'data' => ['message' => 'contact_updated']]);
}

function deleteContact(int $id): void {
    $db = getDB();

    $stmt = $db->prepare('SELECT id FROM contacts WHERE id = ?');
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        jsonResponse(['ok' => false, 'error' => 'Contact not found'], 404);
    }

    $db->beginTransaction();
    try {
        $db->prepare('UPDATE leads SET contact_id = NULL WHERE contact_id = ?')->execute([$id]);
        $db->prepare('UPDATE deals SET contact_id = NULL WHERE contact_id = ?')->execute([$id]);
        $db->prepare('UPDATE tasks SET contact_id = NULL WHERE contact_id = ?')->execute([$id]);
        $db->prepare('DELETE FROM notes WHERE entity_type = "contact" AND entity_id = ?')->execute([$id]);
        $db->prepare('DELETE FROM contacts WHERE id = ?')->execute([$id]);
        $db->commit();
    } catch (Exception $e) {
        $db->rollBack();
        throw $e;
    }

    logActivity('contact_deleted', "Deleted contact ID: $id");

    jsonResponse(['ok' => true, 'data' => ['message' => 'contact_deleted']]);
}
