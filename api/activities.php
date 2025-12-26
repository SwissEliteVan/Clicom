<?php
/**
 * Activities API Endpoint
 *
 * GET  /api/activities        - List activities
 * GET  /api/activities?id=X   - Get single activity
 * POST /api/activities        - Log custom activity
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
            getActivity($id);
        } else {
            listActivities();
        }
        break;

    case 'POST':
        requireCsrf();
        createActivity($input);
        break;

    default:
        jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
}

function listActivities(): void {
    $db = getDB();
    $pagination = getPagination();

    $where = [];
    $params = [];

    // Entity filter
    if (!empty($_GET['entity_type']) && !empty($_GET['entity_id'])) {
        $where[] = 'a.entity_type = ? AND a.entity_id = ?';
        $params[] = $_GET['entity_type'];
        $params[] = (int)$_GET['entity_id'];
    }

    // User filter
    if (!empty($_GET['user_id'])) {
        $where[] = 'a.user_id = ?';
        $params[] = (int)$_GET['user_id'];
    }

    // Type filter
    if (!empty($_GET['type'])) {
        $where[] = 'a.type = ?';
        $params[] = $_GET['type'];
    }

    // Date range
    if (!empty($_GET['from'])) {
        $where[] = 'a.created_at >= ?';
        $params[] = $_GET['from'] . ' 00:00:00';
    }
    if (!empty($_GET['to'])) {
        $where[] = 'a.created_at <= ?';
        $params[] = $_GET['to'] . ' 23:59:59';
    }

    $whereClause = !empty($where) ? 'WHERE ' . implode(' AND ', $where) : '';

    // Get total count
    $stmt = $db->prepare("SELECT COUNT(*) FROM activities a $whereClause");
    $stmt->execute($params);
    $total = (int)$stmt->fetchColumn();

    // Get activities
    $sql = "
        SELECT a.*,
               u.first_name AS user_first_name,
               u.last_name AS user_last_name
        FROM activities a
        LEFT JOIN users u ON a.user_id = u.id
        $whereClause
        ORDER BY a.created_at DESC
        LIMIT ? OFFSET ?
    ";

    $params[] = $pagination['per_page'];
    $params[] = $pagination['offset'];

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $activities = $stmt->fetchAll();

    // Parse metadata JSON
    foreach ($activities as &$activity) {
        if ($activity['metadata']) {
            $activity['metadata'] = json_decode($activity['metadata'], true);
        }
    }

    jsonResponse(paginatedResponse($activities, $total, $pagination));
}

function getActivity(int $id): void {
    $db = getDB();

    $stmt = $db->prepare('
        SELECT a.*,
               u.first_name AS user_first_name,
               u.last_name AS user_last_name
        FROM activities a
        LEFT JOIN users u ON a.user_id = u.id
        WHERE a.id = ?
    ');
    $stmt->execute([$id]);
    $activity = $stmt->fetch();

    if (!$activity) {
        jsonResponse(['ok' => false, 'error' => 'Activity not found'], 404);
    }

    if ($activity['metadata']) {
        $activity['metadata'] = json_decode($activity['metadata'], true);
    }

    jsonResponse(['ok' => true, 'data' => $activity]);
}

function createActivity(array $input): void {
    $errors = validate($input, [
        'type' => ['required' => true, 'max_length' => 50],
        'description' => ['required' => true],
    ]);

    if (!empty($errors)) {
        jsonResponse(['ok' => false, 'error' => 'validation_failed', 'data' => $errors], 400);
    }

    $db = getDB();
    $currentUser = getCurrentUser();

    $stmt = $db->prepare('
        INSERT INTO activities (type, description, entity_type, entity_id, metadata, user_id)
        VALUES (?, ?, ?, ?, ?, ?)
    ');

    $stmt->execute([
        sanitize($input['type']),
        sanitize($input['description']),
        $input['entity_type'] ?? null,
        !empty($input['entity_id']) ? (int)$input['entity_id'] : null,
        !empty($input['metadata']) ? json_encode($input['metadata']) : null,
        $currentUser['id'],
    ]);

    $activityId = (int)$db->lastInsertId();

    jsonResponse([
        'ok' => true,
        'data' => ['id' => $activityId, 'message' => 'activity_created'],
    ], 201);
}
