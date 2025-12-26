<?php
/**
 * Tasks API Endpoint
 *
 * GET    /api/tasks        - List tasks
 * GET    /api/tasks?id=X   - Get single task
 * POST   /api/tasks        - Create task
 * PUT    /api/tasks        - Update task
 * DELETE /api/tasks?id=X   - Delete task
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
            getTask($id);
        } else {
            listTasks();
        }
        break;

    case 'POST':
        requireCsrf();
        createTask($input);
        break;

    case 'PUT':
        requireCsrf();
        updateTask($input);
        break;

    case 'DELETE':
        requireCsrf();
        if (!$id) {
            jsonResponse(['ok' => false, 'error' => 'ID required'], 400);
        }
        deleteTask($id);
        break;

    default:
        jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
}

function listTasks(): void {
    $db = getDB();
    $pagination = getPagination();
    $currentUser = getCurrentUser();

    $where = [];
    $params = [];

    // Search filter
    if (!empty($_GET['search'])) {
        $search = '%' . $_GET['search'] . '%';
        $where[] = '(t.title LIKE ? OR t.description LIKE ?)';
        $params[] = $search;
        $params[] = $search;
    }

    // Status filter
    if (!empty($_GET['status'])) {
        $where[] = 't.status = ?';
        $params[] = $_GET['status'];
    }

    // Priority filter
    if (!empty($_GET['priority'])) {
        $where[] = 't.priority = ?';
        $params[] = $_GET['priority'];
    }

    // Assigned to filter
    if (!empty($_GET['assigned_to'])) {
        if ($_GET['assigned_to'] === 'me') {
            $where[] = 't.assigned_to = ?';
            $params[] = $currentUser['id'];
        } else {
            $where[] = 't.assigned_to = ?';
            $params[] = (int)$_GET['assigned_to'];
        }
    }

    // Due date filters
    if (!empty($_GET['due_today'])) {
        $where[] = 'DATE(t.due_date) = CURDATE()';
    }
    if (!empty($_GET['overdue'])) {
        $where[] = 't.due_date < NOW() AND t.status NOT IN ("completed", "cancelled")';
    }
    if (!empty($_GET['upcoming'])) {
        $where[] = 't.due_date BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 7 DAY)';
    }

    // Related entity filters
    if (!empty($_GET['lead_id'])) {
        $where[] = 't.lead_id = ?';
        $params[] = (int)$_GET['lead_id'];
    }
    if (!empty($_GET['deal_id'])) {
        $where[] = 't.deal_id = ?';
        $params[] = (int)$_GET['deal_id'];
    }

    $whereClause = !empty($where) ? 'WHERE ' . implode(' AND ', $where) : '';

    // Get total count
    $stmt = $db->prepare("SELECT COUNT(*) FROM tasks t $whereClause");
    $stmt->execute($params);
    $total = (int)$stmt->fetchColumn();

    // Get tasks
    $orderBy = $_GET['sort'] ?? 'due_date';
    $orderDir = strtoupper($_GET['order'] ?? 'ASC') === 'DESC' ? 'DESC' : 'ASC';
    $allowedSort = ['title', 'status', 'priority', 'due_date', 'created_at'];
    if (!in_array($orderBy, $allowedSort)) {
        $orderBy = 'due_date';
    }

    $sql = "
        SELECT t.*,
               u.first_name AS assignee_first_name,
               u.last_name AS assignee_last_name,
               l.name AS lead_name,
               d.name AS deal_name
        FROM tasks t
        LEFT JOIN users u ON t.assigned_to = u.id
        LEFT JOIN leads l ON t.lead_id = l.id
        LEFT JOIN deals d ON t.deal_id = d.id
        $whereClause
        ORDER BY
            CASE t.status
                WHEN 'pending' THEN 1
                WHEN 'in_progress' THEN 2
                WHEN 'completed' THEN 3
                WHEN 'cancelled' THEN 4
            END,
            t.$orderBy $orderDir
        LIMIT ? OFFSET ?
    ";

    $params[] = $pagination['per_page'];
    $params[] = $pagination['offset'];

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $tasks = $stmt->fetchAll();

    jsonResponse(paginatedResponse($tasks, $total, $pagination));
}

function getTask(int $id): void {
    $db = getDB();

    $stmt = $db->prepare('
        SELECT t.*,
               u.first_name AS assignee_first_name,
               u.last_name AS assignee_last_name,
               u.email AS assignee_email,
               l.name AS lead_name,
               d.name AS deal_name,
               c.name AS company_name,
               ct.first_name AS contact_first_name,
               ct.last_name AS contact_last_name,
               cr.first_name AS creator_first_name,
               cr.last_name AS creator_last_name
        FROM tasks t
        LEFT JOIN users u ON t.assigned_to = u.id
        LEFT JOIN users cr ON t.created_by = cr.id
        LEFT JOIN leads l ON t.lead_id = l.id
        LEFT JOIN deals d ON t.deal_id = d.id
        LEFT JOIN companies c ON t.company_id = c.id
        LEFT JOIN contacts ct ON t.contact_id = ct.id
        WHERE t.id = ?
    ');
    $stmt->execute([$id]);
    $task = $stmt->fetch();

    if (!$task) {
        jsonResponse(['ok' => false, 'error' => 'Task not found'], 404);
    }

    jsonResponse(['ok' => true, 'data' => $task]);
}

function createTask(array $input): void {
    $errors = validate($input, [
        'title' => ['required' => true, 'max_length' => 255],
        'status' => ['in' => ['pending', 'in_progress', 'completed', 'cancelled']],
        'priority' => ['in' => ['low', 'medium', 'high', 'urgent']],
    ]);

    if (!empty($errors)) {
        jsonResponse(['ok' => false, 'error' => 'validation_failed', 'data' => $errors], 400);
    }

    $db = getDB();
    $currentUser = getCurrentUser();

    $stmt = $db->prepare('
        INSERT INTO tasks (
            title, description, due_date, status, priority,
            lead_id, deal_id, company_id, contact_id, assigned_to, created_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ');

    $stmt->execute([
        sanitize($input['title']),
        sanitize($input['description'] ?? null),
        $input['due_date'] ?? null,
        $input['status'] ?? 'pending',
        $input['priority'] ?? 'medium',
        !empty($input['lead_id']) ? (int)$input['lead_id'] : null,
        !empty($input['deal_id']) ? (int)$input['deal_id'] : null,
        !empty($input['company_id']) ? (int)$input['company_id'] : null,
        !empty($input['contact_id']) ? (int)$input['contact_id'] : null,
        !empty($input['assigned_to']) ? (int)$input['assigned_to'] : $currentUser['id'],
        $currentUser['id'],
    ]);

    $taskId = (int)$db->lastInsertId();

    logActivity('task_created', "Created task: {$input['title']}", 'task', $taskId);

    jsonResponse([
        'ok' => true,
        'data' => ['id' => $taskId, 'message' => 'task_created'],
    ], 201);
}

function updateTask(array $input): void {
    $id = (int)($input['id'] ?? 0);
    if (!$id) {
        jsonResponse(['ok' => false, 'error' => 'ID required'], 400);
    }

    $db = getDB();

    $stmt = $db->prepare('SELECT id, status FROM tasks WHERE id = ?');
    $stmt->execute([$id]);
    $existingTask = $stmt->fetch();

    if (!$existingTask) {
        jsonResponse(['ok' => false, 'error' => 'Task not found'], 404);
    }

    $errors = validate($input, [
        'title' => ['max_length' => 255],
        'status' => ['in' => ['pending', 'in_progress', 'completed', 'cancelled']],
        'priority' => ['in' => ['low', 'medium', 'high', 'urgent']],
    ]);

    if (!empty($errors)) {
        jsonResponse(['ok' => false, 'error' => 'validation_failed', 'data' => $errors], 400);
    }

    $updates = [];
    $params = [];

    $stringFields = ['title', 'description'];
    foreach ($stringFields as $field) {
        if (isset($input[$field])) {
            $updates[] = "$field = ?";
            $params[] = sanitize($input[$field]);
        }
    }

    if (isset($input['status'])) {
        $updates[] = 'status = ?';
        $params[] = $input['status'];

        // Set completed_at if status is completed
        if ($input['status'] === 'completed' && $existingTask['status'] !== 'completed') {
            $updates[] = 'completed_at = NOW()';
        } elseif ($input['status'] !== 'completed') {
            $updates[] = 'completed_at = NULL';
        }
    }

    if (isset($input['priority'])) {
        $updates[] = 'priority = ?';
        $params[] = $input['priority'];
    }

    if (isset($input['due_date'])) {
        $updates[] = 'due_date = ?';
        $params[] = $input['due_date'] ?: null;
    }

    $foreignFields = ['lead_id', 'deal_id', 'company_id', 'contact_id', 'assigned_to'];
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
    $sql = 'UPDATE tasks SET ' . implode(', ', $updates) . ' WHERE id = ?';
    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    // Log status change
    if (isset($input['status']) && $input['status'] !== $existingTask['status']) {
        logActivity(
            'task_status_changed',
            "Task status changed: {$existingTask['status']} -> {$input['status']}",
            'task',
            $id
        );
    } else {
        logActivity('task_updated', "Updated task ID: $id", 'task', $id);
    }

    jsonResponse(['ok' => true, 'data' => ['message' => 'task_updated']]);
}

function deleteTask(int $id): void {
    $db = getDB();

    $stmt = $db->prepare('SELECT id FROM tasks WHERE id = ?');
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        jsonResponse(['ok' => false, 'error' => 'Task not found'], 404);
    }

    $stmt = $db->prepare('DELETE FROM tasks WHERE id = ?');
    $stmt->execute([$id]);

    logActivity('task_deleted', "Deleted task ID: $id");

    jsonResponse(['ok' => true, 'data' => ['message' => 'task_deleted']]);
}
