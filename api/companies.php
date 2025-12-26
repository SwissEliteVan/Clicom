<?php
/**
 * Companies API Endpoint
 *
 * GET    /api/companies        - List companies
 * GET    /api/companies?id=X   - Get single company
 * POST   /api/companies        - Create company
 * PUT    /api/companies        - Update company
 * DELETE /api/companies?id=X   - Delete company
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
            getCompany($id);
        } else {
            listCompanies();
        }
        break;

    case 'POST':
        requireCsrf();
        createCompany($input);
        break;

    case 'PUT':
        requireCsrf();
        updateCompany($input);
        break;

    case 'DELETE':
        requireCsrf();
        if (!$id) {
            jsonResponse(['ok' => false, 'error' => 'ID required'], 400);
        }
        deleteCompany($id);
        break;

    default:
        jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
}

function listCompanies(): void {
    $db = getDB();
    $pagination = getPagination();

    $where = [];
    $params = [];

    // Search filter
    if (!empty($_GET['search'])) {
        $search = '%' . $_GET['search'] . '%';
        $where[] = '(c.name LIKE ? OR c.industry LIKE ? OR c.city LIKE ?)';
        $params[] = $search;
        $params[] = $search;
        $params[] = $search;
    }

    // Industry filter
    if (!empty($_GET['industry'])) {
        $where[] = 'c.industry = ?';
        $params[] = $_GET['industry'];
    }

    // Country filter
    if (!empty($_GET['country'])) {
        $where[] = 'c.country = ?';
        $params[] = $_GET['country'];
    }

    $whereClause = !empty($where) ? 'WHERE ' . implode(' AND ', $where) : '';

    // Get total count
    $stmt = $db->prepare("SELECT COUNT(*) FROM companies c $whereClause");
    $stmt->execute($params);
    $total = (int)$stmt->fetchColumn();

    // Get companies
    $orderBy = $_GET['sort'] ?? 'name';
    $orderDir = strtoupper($_GET['order'] ?? 'ASC') === 'DESC' ? 'DESC' : 'ASC';
    $allowedSort = ['name', 'industry', 'city', 'country', 'created_at'];
    if (!in_array($orderBy, $allowedSort)) {
        $orderBy = 'name';
    }

    $sql = "
        SELECT c.*,
               u.first_name AS owner_first_name,
               u.last_name AS owner_last_name,
               (SELECT COUNT(*) FROM contacts WHERE company_id = c.id) AS contacts_count,
               (SELECT COUNT(*) FROM leads WHERE company_id = c.id) AS leads_count,
               (SELECT COUNT(*) FROM deals WHERE company_id = c.id) AS deals_count
        FROM companies c
        LEFT JOIN users u ON c.owner_id = u.id
        $whereClause
        ORDER BY c.$orderBy $orderDir
        LIMIT ? OFFSET ?
    ";

    $params[] = $pagination['per_page'];
    $params[] = $pagination['offset'];

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $companies = $stmt->fetchAll();

    jsonResponse(paginatedResponse($companies, $total, $pagination));
}

function getCompany(int $id): void {
    $db = getDB();

    $stmt = $db->prepare('
        SELECT c.*,
               u.first_name AS owner_first_name,
               u.last_name AS owner_last_name,
               u.email AS owner_email
        FROM companies c
        LEFT JOIN users u ON c.owner_id = u.id
        WHERE c.id = ?
    ');
    $stmt->execute([$id]);
    $company = $stmt->fetch();

    if (!$company) {
        jsonResponse(['ok' => false, 'error' => 'Company not found'], 404);
    }

    // Get contacts
    $stmt = $db->prepare('
        SELECT id, first_name, last_name, email, phone, job_title
        FROM contacts
        WHERE company_id = ?
        ORDER BY last_name, first_name
        LIMIT 20
    ');
    $stmt->execute([$id]);
    $company['contacts'] = $stmt->fetchAll();

    // Get leads
    $stmt = $db->prepare('
        SELECT id, name, status, priority, score
        FROM leads
        WHERE company_id = ?
        ORDER BY created_at DESC
        LIMIT 10
    ');
    $stmt->execute([$id]);
    $company['leads'] = $stmt->fetchAll();

    // Get deals
    $stmt = $db->prepare('
        SELECT id, name, stage, amount, probability
        FROM deals
        WHERE company_id = ?
        ORDER BY created_at DESC
        LIMIT 10
    ');
    $stmt->execute([$id]);
    $company['deals'] = $stmt->fetchAll();

    // Get notes
    $stmt = $db->prepare('
        SELECT n.*, u.first_name, u.last_name
        FROM notes n
        LEFT JOIN users u ON n.created_by = u.id
        WHERE n.entity_type = "company" AND n.entity_id = ?
        ORDER BY n.is_pinned DESC, n.created_at DESC
        LIMIT 10
    ');
    $stmt->execute([$id]);
    $company['notes'] = $stmt->fetchAll();

    jsonResponse(['ok' => true, 'data' => $company]);
}

function createCompany(array $input): void {
    $errors = validate($input, [
        'name' => ['required' => true, 'max_length' => 255],
        'email' => ['email' => true, 'max_length' => 255],
        'website' => ['max_length' => 255],
    ]);

    if (!empty($errors)) {
        jsonResponse(['ok' => false, 'error' => 'validation_failed', 'data' => $errors], 400);
    }

    $db = getDB();
    $currentUser = getCurrentUser();

    $stmt = $db->prepare('
        INSERT INTO companies (
            name, industry, website, phone, email, address, city, country, notes,
            owner_id, created_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ');

    $stmt->execute([
        sanitize($input['name']),
        sanitize($input['industry'] ?? null),
        sanitize($input['website'] ?? null),
        sanitize($input['phone'] ?? null),
        sanitize($input['email'] ?? null),
        sanitize($input['address'] ?? null),
        sanitize($input['city'] ?? null),
        sanitize($input['country'] ?? null),
        sanitize($input['notes'] ?? null),
        !empty($input['owner_id']) ? (int)$input['owner_id'] : $currentUser['id'],
        $currentUser['id'],
    ]);

    $companyId = (int)$db->lastInsertId();

    logActivity('company_created', "Created company: {$input['name']}", 'company', $companyId);

    jsonResponse([
        'ok' => true,
        'data' => ['id' => $companyId, 'message' => 'company_created'],
    ], 201);
}

function updateCompany(array $input): void {
    $id = (int)($input['id'] ?? 0);
    if (!$id) {
        jsonResponse(['ok' => false, 'error' => 'ID required'], 400);
    }

    $db = getDB();

    $stmt = $db->prepare('SELECT id FROM companies WHERE id = ?');
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        jsonResponse(['ok' => false, 'error' => 'Company not found'], 404);
    }

    $errors = validate($input, [
        'name' => ['max_length' => 255],
        'email' => ['email' => true, 'max_length' => 255],
        'website' => ['max_length' => 255],
    ]);

    if (!empty($errors)) {
        jsonResponse(['ok' => false, 'error' => 'validation_failed', 'data' => $errors], 400);
    }

    $updates = [];
    $params = [];

    $fields = ['name', 'industry', 'website', 'phone', 'email', 'address', 'city', 'country', 'notes'];
    foreach ($fields as $field) {
        if (isset($input[$field])) {
            $updates[] = "$field = ?";
            $params[] = sanitize($input[$field]);
        }
    }

    if (isset($input['owner_id'])) {
        $updates[] = 'owner_id = ?';
        $params[] = $input['owner_id'] ? (int)$input['owner_id'] : null;
    }

    if (empty($updates)) {
        jsonResponse(['ok' => false, 'error' => 'no_changes'], 400);
    }

    $params[] = $id;
    $sql = 'UPDATE companies SET ' . implode(', ', $updates) . ' WHERE id = ?';
    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    logActivity('company_updated', "Updated company ID: $id", 'company', $id);

    jsonResponse(['ok' => true, 'data' => ['message' => 'company_updated']]);
}

function deleteCompany(int $id): void {
    $db = getDB();

    $stmt = $db->prepare('SELECT id FROM companies WHERE id = ?');
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        jsonResponse(['ok' => false, 'error' => 'Company not found'], 404);
    }

    $db->beginTransaction();
    try {
        // Nullify references
        $db->prepare('UPDATE contacts SET company_id = NULL WHERE company_id = ?')->execute([$id]);
        $db->prepare('UPDATE leads SET company_id = NULL WHERE company_id = ?')->execute([$id]);
        $db->prepare('UPDATE deals SET company_id = NULL WHERE company_id = ?')->execute([$id]);
        $db->prepare('UPDATE tasks SET company_id = NULL WHERE company_id = ?')->execute([$id]);
        $db->prepare('DELETE FROM notes WHERE entity_type = "company" AND entity_id = ?')->execute([$id]);
        $db->prepare('DELETE FROM companies WHERE id = ?')->execute([$id]);
        $db->commit();
    } catch (Exception $e) {
        $db->rollBack();
        throw $e;
    }

    logActivity('company_deleted', "Deleted company ID: $id");

    jsonResponse(['ok' => true, 'data' => ['message' => 'company_deleted']]);
}
