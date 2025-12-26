<?php
/**
 * Users API Endpoint
 *
 * GET    /api/users        - List users (admin only)
 * GET    /api/users?id=X   - Get single user
 * POST   /api/users        - Create user (admin only)
 * PUT    /api/users        - Update user
 * DELETE /api/users?id=X   - Delete user (admin only)
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
            getUser($id);
        } else {
            listUsers();
        }
        break;

    case 'POST':
        requireAdmin();
        requireCsrf();
        createUser($input);
        break;

    case 'PUT':
        requireCsrf();
        updateUser($input);
        break;

    case 'DELETE':
        requireAdmin();
        requireCsrf();
        if (!$id) {
            jsonResponse(['ok' => false, 'error' => 'ID required'], 400);
        }
        deleteUser($id);
        break;

    default:
        jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
}

function listUsers(): void {
    requireAdmin();

    $db = getDB();
    $pagination = getPagination();

    // Get total count
    $stmt = $db->query('SELECT COUNT(*) FROM users');
    $total = (int)$stmt->fetchColumn();

    // Get users
    $stmt = $db->prepare('
        SELECT id, email, first_name, last_name, role, locale, is_active, last_login, created_at
        FROM users
        ORDER BY created_at DESC
        LIMIT :limit OFFSET :offset
    ');
    $stmt->bindValue(':limit', $pagination['per_page'], PDO::PARAM_INT);
    $stmt->bindValue(':offset', $pagination['offset'], PDO::PARAM_INT);
    $stmt->execute();
    $users = $stmt->fetchAll();

    jsonResponse(paginatedResponse($users, $total, $pagination));
}

function getUser(int $id): void {
    $currentUser = getCurrentUser();

    // Users can only view their own profile unless admin
    if ($currentUser['role'] !== 'admin' && $currentUser['id'] !== $id) {
        jsonResponse(['ok' => false, 'error' => 'Forbidden'], 403);
    }

    $db = getDB();
    $stmt = $db->prepare('
        SELECT id, email, first_name, last_name, role, locale, is_active, last_login, created_at, updated_at
        FROM users
        WHERE id = ?
    ');
    $stmt->execute([$id]);
    $user = $stmt->fetch();

    if (!$user) {
        jsonResponse(['ok' => false, 'error' => 'User not found'], 404);
    }

    jsonResponse(['ok' => true, 'data' => $user]);
}

function createUser(array $input): void {
    global $config;

    $errors = validate($input, [
        'email' => ['required' => true, 'email' => true, 'max_length' => 255],
        'password' => ['required' => true, 'min_length' => $config['security']['password_min_length'] ?? 8],
        'first_name' => ['required' => true, 'max_length' => 100],
        'last_name' => ['required' => true, 'max_length' => 100],
        'role' => ['in' => ['admin', 'user']],
        'locale' => ['in' => ['fr', 'en', 'de', 'it']],
    ]);

    if (!empty($errors)) {
        jsonResponse(['ok' => false, 'error' => 'validation_failed', 'data' => $errors], 400);
    }

    $db = getDB();

    // Check if email already exists
    $stmt = $db->prepare('SELECT id FROM users WHERE email = ?');
    $stmt->execute([sanitize($input['email'])]);
    if ($stmt->fetch()) {
        jsonResponse(['ok' => false, 'error' => 'email_exists'], 409);
    }

    // Hash password
    $hashedPassword = password_hash($input['password'], PASSWORD_DEFAULT);

    // Insert user
    $stmt = $db->prepare('
        INSERT INTO users (email, password, first_name, last_name, role, locale, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ');
    $stmt->execute([
        sanitize($input['email']),
        $hashedPassword,
        sanitize($input['first_name']),
        sanitize($input['last_name']),
        $input['role'] ?? 'user',
        $input['locale'] ?? 'fr',
        $input['is_active'] ?? 1,
    ]);

    $userId = (int)$db->lastInsertId();

    logActivity('user_created', "Created user: {$input['email']}", 'user', $userId);

    jsonResponse([
        'ok' => true,
        'data' => ['id' => $userId, 'message' => 'user_created'],
    ], 201);
}

function updateUser(array $input): void {
    global $config;

    $id = (int)($input['id'] ?? 0);
    if (!$id) {
        jsonResponse(['ok' => false, 'error' => 'ID required'], 400);
    }

    $currentUser = getCurrentUser();

    // Users can only update their own profile unless admin
    $isAdmin = $currentUser['role'] === 'admin';
    if (!$isAdmin && $currentUser['id'] !== $id) {
        jsonResponse(['ok' => false, 'error' => 'Forbidden'], 403);
    }

    $db = getDB();

    // Check if user exists
    $stmt = $db->prepare('SELECT id, email FROM users WHERE id = ?');
    $stmt->execute([$id]);
    $existingUser = $stmt->fetch();

    if (!$existingUser) {
        jsonResponse(['ok' => false, 'error' => 'User not found'], 404);
    }

    // Build update query dynamically
    $updates = [];
    $params = [];

    // Fields users can update themselves
    if (isset($input['first_name'])) {
        $updates[] = 'first_name = ?';
        $params[] = sanitize($input['first_name']);
    }

    if (isset($input['last_name'])) {
        $updates[] = 'last_name = ?';
        $params[] = sanitize($input['last_name']);
    }

    if (isset($input['locale']) && in_array($input['locale'], ['fr', 'en', 'de', 'it'])) {
        $updates[] = 'locale = ?';
        $params[] = $input['locale'];
    }

    // Password change (user must provide current password unless admin)
    if (!empty($input['new_password'])) {
        if (strlen($input['new_password']) < ($config['security']['password_min_length'] ?? 8)) {
            jsonResponse(['ok' => false, 'error' => 'password_too_short'], 400);
        }

        if (!$isAdmin) {
            // Verify current password
            $stmt = $db->prepare('SELECT password FROM users WHERE id = ?');
            $stmt->execute([$id]);
            $user = $stmt->fetch();

            if (empty($input['current_password']) || !password_verify($input['current_password'], $user['password'])) {
                jsonResponse(['ok' => false, 'error' => 'invalid_current_password'], 400);
            }
        }

        $updates[] = 'password = ?';
        $params[] = password_hash($input['new_password'], PASSWORD_DEFAULT);
    }

    // Admin-only fields
    if ($isAdmin) {
        if (isset($input['email']) && $input['email'] !== $existingUser['email']) {
            if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
                jsonResponse(['ok' => false, 'error' => 'invalid_email'], 400);
            }

            // Check if new email already exists
            $stmt = $db->prepare('SELECT id FROM users WHERE email = ? AND id != ?');
            $stmt->execute([sanitize($input['email']), $id]);
            if ($stmt->fetch()) {
                jsonResponse(['ok' => false, 'error' => 'email_exists'], 409);
            }

            $updates[] = 'email = ?';
            $params[] = sanitize($input['email']);
        }

        if (isset($input['role']) && in_array($input['role'], ['admin', 'user'])) {
            // Prevent admin from demoting themselves if they're the only admin
            if ($currentUser['id'] === $id && $input['role'] !== 'admin') {
                $stmt = $db->query('SELECT COUNT(*) FROM users WHERE role = "admin" AND is_active = 1');
                if ((int)$stmt->fetchColumn() <= 1) {
                    jsonResponse(['ok' => false, 'error' => 'cannot_remove_last_admin'], 400);
                }
            }

            $updates[] = 'role = ?';
            $params[] = $input['role'];
        }

        if (isset($input['is_active'])) {
            // Prevent admin from deactivating themselves
            if ($currentUser['id'] === $id && !$input['is_active']) {
                jsonResponse(['ok' => false, 'error' => 'cannot_deactivate_self'], 400);
            }

            $updates[] = 'is_active = ?';
            $params[] = (int)(bool)$input['is_active'];
        }
    }

    if (empty($updates)) {
        jsonResponse(['ok' => false, 'error' => 'no_changes'], 400);
    }

    $params[] = $id;
    $sql = 'UPDATE users SET ' . implode(', ', $updates) . ' WHERE id = ?';
    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    logActivity('user_updated', "Updated user ID: $id", 'user', $id);

    jsonResponse(['ok' => true, 'data' => ['message' => 'user_updated']]);
}

function deleteUser(int $id): void {
    $currentUser = getCurrentUser();

    // Prevent self-deletion
    if ($currentUser['id'] === $id) {
        jsonResponse(['ok' => false, 'error' => 'cannot_delete_self'], 400);
    }

    $db = getDB();

    // Check if user exists
    $stmt = $db->prepare('SELECT id, role FROM users WHERE id = ?');
    $stmt->execute([$id]);
    $user = $stmt->fetch();

    if (!$user) {
        jsonResponse(['ok' => false, 'error' => 'User not found'], 404);
    }

    // Prevent deleting the last admin
    if ($user['role'] === 'admin') {
        $stmt = $db->query('SELECT COUNT(*) FROM users WHERE role = "admin" AND is_active = 1');
        if ((int)$stmt->fetchColumn() <= 1) {
            jsonResponse(['ok' => false, 'error' => 'cannot_delete_last_admin'], 400);
        }
    }

    // Delete user (cascades to related records via foreign keys)
    $stmt = $db->prepare('DELETE FROM users WHERE id = ?');
    $stmt->execute([$id]);

    logActivity('user_deleted', "Deleted user ID: $id");

    jsonResponse(['ok' => true, 'data' => ['message' => 'user_deleted']]);
}
