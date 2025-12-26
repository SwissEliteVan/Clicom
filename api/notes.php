<?php
/**
 * Notes API Endpoint
 *
 * GET    /api/notes        - List notes (with entity filters)
 * GET    /api/notes?id=X   - Get single note
 * POST   /api/notes        - Create note
 * PUT    /api/notes        - Update note
 * DELETE /api/notes?id=X   - Delete note
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
            getNote($id);
        } else {
            listNotes();
        }
        break;

    case 'POST':
        requireCsrf();
        createNote($input);
        break;

    case 'PUT':
        requireCsrf();
        updateNote($input);
        break;

    case 'DELETE':
        requireCsrf();
        if (!$id) {
            jsonResponse(['ok' => false, 'error' => 'ID required'], 400);
        }
        deleteNote($id);
        break;

    default:
        jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
}

function listNotes(): void {
    $db = getDB();
    $pagination = getPagination();

    $where = [];
    $params = [];

    // Entity filter (required for listing)
    if (!empty($_GET['entity_type']) && !empty($_GET['entity_id'])) {
        $validTypes = ['lead', 'deal', 'company', 'contact'];
        if (!in_array($_GET['entity_type'], $validTypes)) {
            jsonResponse(['ok' => false, 'error' => 'Invalid entity type'], 400);
        }
        $where[] = 'n.entity_type = ? AND n.entity_id = ?';
        $params[] = $_GET['entity_type'];
        $params[] = (int)$_GET['entity_id'];
    }

    // Pinned only filter
    if (!empty($_GET['pinned'])) {
        $where[] = 'n.is_pinned = 1';
    }

    $whereClause = !empty($where) ? 'WHERE ' . implode(' AND ', $where) : '';

    // Get total count
    $stmt = $db->prepare("SELECT COUNT(*) FROM notes n $whereClause");
    $stmt->execute($params);
    $total = (int)$stmt->fetchColumn();

    // Get notes
    $sql = "
        SELECT n.*,
               u.first_name AS author_first_name,
               u.last_name AS author_last_name
        FROM notes n
        LEFT JOIN users u ON n.created_by = u.id
        $whereClause
        ORDER BY n.is_pinned DESC, n.created_at DESC
        LIMIT ? OFFSET ?
    ";

    $params[] = $pagination['per_page'];
    $params[] = $pagination['offset'];

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $notes = $stmt->fetchAll();

    jsonResponse(paginatedResponse($notes, $total, $pagination));
}

function getNote(int $id): void {
    $db = getDB();

    $stmt = $db->prepare('
        SELECT n.*,
               u.first_name AS author_first_name,
               u.last_name AS author_last_name
        FROM notes n
        LEFT JOIN users u ON n.created_by = u.id
        WHERE n.id = ?
    ');
    $stmt->execute([$id]);
    $note = $stmt->fetch();

    if (!$note) {
        jsonResponse(['ok' => false, 'error' => 'Note not found'], 404);
    }

    jsonResponse(['ok' => true, 'data' => $note]);
}

function createNote(array $input): void {
    $validTypes = ['lead', 'deal', 'company', 'contact'];

    $errors = validate($input, [
        'content' => ['required' => true],
        'entity_type' => ['required' => true, 'in' => $validTypes],
        'entity_id' => ['required' => true, 'numeric' => true],
    ]);

    if (!empty($errors)) {
        jsonResponse(['ok' => false, 'error' => 'validation_failed', 'data' => $errors], 400);
    }

    // Verify entity exists
    $db = getDB();
    $table = $input['entity_type'] === 'company' ? 'companies' : $input['entity_type'] . 's';
    $stmt = $db->prepare("SELECT id FROM $table WHERE id = ?");
    $stmt->execute([(int)$input['entity_id']]);
    if (!$stmt->fetch()) {
        jsonResponse(['ok' => false, 'error' => 'Entity not found'], 404);
    }

    $currentUser = getCurrentUser();

    $stmt = $db->prepare('
        INSERT INTO notes (content, entity_type, entity_id, is_pinned, created_by)
        VALUES (?, ?, ?, ?, ?)
    ');

    $stmt->execute([
        sanitize($input['content']),
        $input['entity_type'],
        (int)$input['entity_id'],
        !empty($input['is_pinned']) ? 1 : 0,
        $currentUser['id'],
    ]);

    $noteId = (int)$db->lastInsertId();

    logActivity('note_created', 'Added note', $input['entity_type'], (int)$input['entity_id']);

    jsonResponse([
        'ok' => true,
        'data' => ['id' => $noteId, 'message' => 'note_created'],
    ], 201);
}

function updateNote(array $input): void {
    $id = (int)($input['id'] ?? 0);
    if (!$id) {
        jsonResponse(['ok' => false, 'error' => 'ID required'], 400);
    }

    $db = getDB();
    $currentUser = getCurrentUser();

    // Check note exists and user can edit it
    $stmt = $db->prepare('SELECT id, created_by FROM notes WHERE id = ?');
    $stmt->execute([$id]);
    $existingNote = $stmt->fetch();

    if (!$existingNote) {
        jsonResponse(['ok' => false, 'error' => 'Note not found'], 404);
    }

    // Only creator or admin can edit
    if ($existingNote['created_by'] !== $currentUser['id'] && $currentUser['role'] !== 'admin') {
        jsonResponse(['ok' => false, 'error' => 'Forbidden'], 403);
    }

    $updates = [];
    $params = [];

    if (isset($input['content'])) {
        $updates[] = 'content = ?';
        $params[] = sanitize($input['content']);
    }

    if (isset($input['is_pinned'])) {
        $updates[] = 'is_pinned = ?';
        $params[] = (int)(bool)$input['is_pinned'];
    }

    if (empty($updates)) {
        jsonResponse(['ok' => false, 'error' => 'no_changes'], 400);
    }

    $params[] = $id;
    $sql = 'UPDATE notes SET ' . implode(', ', $updates) . ' WHERE id = ?';
    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    jsonResponse(['ok' => true, 'data' => ['message' => 'note_updated']]);
}

function deleteNote(int $id): void {
    $db = getDB();
    $currentUser = getCurrentUser();

    $stmt = $db->prepare('SELECT id, created_by FROM notes WHERE id = ?');
    $stmt->execute([$id]);
    $note = $stmt->fetch();

    if (!$note) {
        jsonResponse(['ok' => false, 'error' => 'Note not found'], 404);
    }

    // Only creator or admin can delete
    if ($note['created_by'] !== $currentUser['id'] && $currentUser['role'] !== 'admin') {
        jsonResponse(['ok' => false, 'error' => 'Forbidden'], 403);
    }

    $stmt = $db->prepare('DELETE FROM notes WHERE id = ?');
    $stmt->execute([$id]);

    jsonResponse(['ok' => true, 'data' => ['message' => 'note_deleted']]);
}
