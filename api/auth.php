<?php
/**
 * Authentication API Endpoint
 *
 * POST /api/auth
 *   action: login|logout|check|csrf
 */

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

$method = getMethod();
$input = getJsonInput();
$action = $input['action'] ?? $_GET['action'] ?? 'check';

switch ($method) {
    case 'GET':
        handleGet($action);
        break;

    case 'POST':
        handlePost($action, $input);
        break;

    default:
        jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
}

function handleGet(string $action): void {
    switch ($action) {
        case 'check':
            checkAuth();
            break;

        case 'csrf':
            getCsrfToken();
            break;

        default:
            jsonResponse(['ok' => false, 'error' => 'Invalid action'], 400);
    }
}

function handlePost(string $action, array $input): void {
    switch ($action) {
        case 'login':
            login($input);
            break;

        case 'logout':
            logout();
            break;

        case 'csrf':
            getCsrfToken();
            break;

        default:
            jsonResponse(['ok' => false, 'error' => 'Invalid action'], 400);
    }
}

function checkAuth(): void {
    if (!isAuthenticated()) {
        jsonResponse([
            'ok' => true,
            'data' => [
                'authenticated' => false,
                'user' => null,
            ],
        ]);
    }

    $user = getCurrentUser();
    if (!$user) {
        // Session exists but user not found or inactive
        session_destroy();
        jsonResponse([
            'ok' => true,
            'data' => [
                'authenticated' => false,
                'user' => null,
            ],
        ]);
    }

    jsonResponse([
        'ok' => true,
        'data' => [
            'authenticated' => true,
            'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
                'role' => $user['role'],
                'locale' => $user['locale'],
            ],
        ],
    ]);
}

function getCsrfToken(): void {
    $token = generateCsrfToken();
    jsonResponse([
        'ok' => true,
        'data' => ['csrf_token' => $token],
    ]);
}

function login(array $input): void {
    global $config;

    $email = sanitize($input['email'] ?? '');
    $password = $input['password'] ?? '';

    // Validate input
    if (empty($email) || empty($password)) {
        jsonResponse(['ok' => false, 'error' => 'email_password_required'], 400);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(['ok' => false, 'error' => 'invalid_email'], 400);
    }

    $db = getDB();

    // Get user by email
    $stmt = $db->prepare('
        SELECT id, email, password, first_name, last_name, role, locale, is_active, login_attempts, locked_until
        FROM users
        WHERE email = ?
    ');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    // Check if user exists
    if (!$user) {
        // Use same message to prevent user enumeration
        jsonResponse(['ok' => false, 'error' => 'invalid_credentials'], 401);
    }

    // Check if account is locked
    if ($user['locked_until'] && strtotime($user['locked_until']) > time()) {
        $remainingSeconds = strtotime($user['locked_until']) - time();
        jsonResponse([
            'ok' => false,
            'error' => 'account_locked',
            'data' => ['remaining_seconds' => $remainingSeconds],
        ], 429);
    }

    // Check if account is active
    if (!$user['is_active']) {
        jsonResponse(['ok' => false, 'error' => 'account_inactive'], 403);
    }

    // Verify password
    if (!password_verify($password, $user['password'])) {
        // Increment login attempts
        $attempts = $user['login_attempts'] + 1;
        $maxAttempts = $config['security']['max_login_attempts'] ?? 5;
        $lockoutDuration = $config['security']['lockout_duration'] ?? 900;

        if ($attempts >= $maxAttempts) {
            $lockedUntil = date('Y-m-d H:i:s', time() + $lockoutDuration);
            $stmt = $db->prepare('UPDATE users SET login_attempts = ?, locked_until = ? WHERE id = ?');
            $stmt->execute([$attempts, $lockedUntil, $user['id']]);
        } else {
            $stmt = $db->prepare('UPDATE users SET login_attempts = ? WHERE id = ?');
            $stmt->execute([$attempts, $user['id']]);
        }

        jsonResponse(['ok' => false, 'error' => 'invalid_credentials'], 401);
    }

    // Successful login - reset attempts and update last login
    $stmt = $db->prepare('
        UPDATE users
        SET login_attempts = 0, locked_until = NULL, last_login = NOW()
        WHERE id = ?
    ');
    $stmt->execute([$user['id']]);

    // Regenerate session ID for security
    session_regenerate_id(true);

    // Set session data
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_role'] = $user['role'];
    $_SESSION['login_time'] = time();

    // Generate new CSRF token
    $csrfToken = generateCsrfToken();

    // Log activity
    logActivity('login', 'User logged in', 'user', $user['id']);

    jsonResponse([
        'ok' => true,
        'data' => [
            'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
                'role' => $user['role'],
                'locale' => $user['locale'],
            ],
            'csrf_token' => $csrfToken,
        ],
    ]);
}

function logout(): void {
    if (isAuthenticated()) {
        logActivity('logout', 'User logged out');
    }

    // Clear session
    $_SESSION = [];

    // Destroy session cookie
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params['path'],
            $params['domain'],
            $params['secure'],
            $params['httponly']
        );
    }

    // Destroy session
    session_destroy();

    jsonResponse([
        'ok' => true,
        'data' => ['message' => 'logged_out'],
    ]);
}
