<?php
/**
 * API Bootstrap - Common functionality for all API endpoints
 */

declare(strict_types=1);

// Error handling
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

// Load configuration
$configPath = __DIR__ . '/../config/config.php';
if (!file_exists($configPath)) {
    jsonResponse(['ok' => false, 'error' => 'Configuration file not found'], 500);
}
$config = require $configPath;

// Set timezone
date_default_timezone_set($config['app']['timezone'] ?? 'UTC');

// Start session with secure settings
if (session_status() === PHP_SESSION_NONE) {
    session_start([
        'name' => $config['session']['name'] ?? 'CRM_SESSION',
        'cookie_lifetime' => $config['session']['lifetime'] ?? 7200,
        'cookie_httponly' => $config['session']['httponly'] ?? true,
        'cookie_secure' => $config['session']['secure'] ?? false,
        'cookie_samesite' => $config['session']['samesite'] ?? 'Strict',
        'use_strict_mode' => true,
    ]);
}

// Database connection
$db = null;

function getDB(): PDO {
    global $db, $config;

    if ($db === null) {
        $dsn = sprintf(
            'mysql:host=%s;port=%d;dbname=%s;charset=%s',
            $config['database']['host'],
            $config['database']['port'],
            $config['database']['name'],
            $config['database']['charset']
        );

        try {
            $db = new PDO($dsn, $config['database']['user'], $config['database']['password'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
        } catch (PDOException $e) {
            error_log('Database connection failed: ' . $e->getMessage());
            jsonResponse(['ok' => false, 'error' => 'Database connection failed'], 500);
        }
    }

    return $db;
}

/**
 * Send JSON response and exit
 */
function jsonResponse(array $data, int $statusCode = 200): never {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, no-cache, must-revalidate');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Get request method
 */
function getMethod(): string {
    return $_SERVER['REQUEST_METHOD'] ?? 'GET';
}

/**
 * Get JSON input data
 */
function getJsonInput(): array {
    $input = file_get_contents('php://input');
    if (empty($input)) {
        return [];
    }
    $data = json_decode($input, true);
    return is_array($data) ? $data : [];
}

/**
 * Check if user is authenticated
 */
function isAuthenticated(): bool {
    return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
}

/**
 * Require authentication
 */
function requireAuth(): void {
    if (!isAuthenticated()) {
        jsonResponse(['ok' => false, 'error' => 'Unauthorized'], 401);
    }
}

/**
 * Get current user
 */
function getCurrentUser(): ?array {
    if (!isAuthenticated()) {
        return null;
    }

    $db = getDB();
    $stmt = $db->prepare('SELECT id, email, first_name, last_name, role, locale FROM users WHERE id = ? AND is_active = 1');
    $stmt->execute([$_SESSION['user_id']]);
    return $stmt->fetch() ?: null;
}

/**
 * Check if current user is admin
 */
function isAdmin(): bool {
    $user = getCurrentUser();
    return $user !== null && $user['role'] === 'admin';
}

/**
 * Require admin role
 */
function requireAdmin(): void {
    requireAuth();
    if (!isAdmin()) {
        jsonResponse(['ok' => false, 'error' => 'Forbidden - Admin access required'], 403);
    }
}

/**
 * Generate CSRF token
 */
function generateCsrfToken(): string {
    $token = bin2hex(random_bytes(32));
    $_SESSION['csrf_token'] = $token;
    $_SESSION['csrf_token_time'] = time();
    return $token;
}

/**
 * Validate CSRF token
 */
function validateCsrfToken(?string $token): bool {
    if (empty($token) || empty($_SESSION['csrf_token'])) {
        return false;
    }

    // Token expires after 2 hours
    $tokenTime = $_SESSION['csrf_token_time'] ?? 0;
    if (time() - $tokenTime > 7200) {
        return false;
    }

    return hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Require valid CSRF token for write operations
 */
function requireCsrf(): void {
    $method = getMethod();
    if (in_array($method, ['POST', 'PUT', 'DELETE', 'PATCH'])) {
        $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? getJsonInput()['csrf_token'] ?? null;
        if (!validateCsrfToken($token)) {
            jsonResponse(['ok' => false, 'error' => 'Invalid CSRF token'], 403);
        }
    }
}

/**
 * Validate input data
 */
function validate(array $data, array $rules): array {
    $errors = [];

    foreach ($rules as $field => $fieldRules) {
        $value = $data[$field] ?? null;

        foreach ($fieldRules as $rule => $param) {
            switch ($rule) {
                case 'required':
                    if ($param && ($value === null || $value === '')) {
                        $errors[$field] = 'required';
                    }
                    break;

                case 'email':
                    if ($param && $value && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
                        $errors[$field] = 'invalid_email';
                    }
                    break;

                case 'min_length':
                    if ($value && strlen($value) < $param) {
                        $errors[$field] = 'too_short';
                    }
                    break;

                case 'max_length':
                    if ($value && strlen($value) > $param) {
                        $errors[$field] = 'too_long';
                    }
                    break;

                case 'numeric':
                    if ($param && $value && !is_numeric($value)) {
                        $errors[$field] = 'must_be_numeric';
                    }
                    break;

                case 'in':
                    if ($value && !in_array($value, $param)) {
                        $errors[$field] = 'invalid_value';
                    }
                    break;

                case 'date':
                    if ($param && $value) {
                        $d = DateTime::createFromFormat('Y-m-d', $value);
                        if (!$d || $d->format('Y-m-d') !== $value) {
                            $errors[$field] = 'invalid_date';
                        }
                    }
                    break;
            }
        }
    }

    return $errors;
}

/**
 * Sanitize string input
 */
function sanitize(?string $value): ?string {
    if ($value === null) {
        return null;
    }
    return htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
}

/**
 * Get pagination parameters
 */
function getPagination(): array {
    global $config;

    $page = max(1, (int)($_GET['page'] ?? 1));
    $perPage = min(
        $config['pagination']['max_per_page'] ?? 100,
        max(1, (int)($_GET['per_page'] ?? $config['pagination']['per_page'] ?? 25))
    );
    $offset = ($page - 1) * $perPage;

    return [
        'page' => $page,
        'per_page' => $perPage,
        'offset' => $offset,
    ];
}

/**
 * Build pagination response
 */
function paginatedResponse(array $items, int $total, array $pagination): array {
    return [
        'ok' => true,
        'data' => $items,
        'meta' => [
            'total' => $total,
            'page' => $pagination['page'],
            'per_page' => $pagination['per_page'],
            'total_pages' => (int)ceil($total / $pagination['per_page']),
        ],
    ];
}

/**
 * Log activity
 */
function logActivity(string $type, string $description, ?string $entityType = null, ?int $entityId = null, ?array $metadata = null): void {
    global $config;

    if (!($config['features']['activity_log'] ?? true)) {
        return;
    }

    if (!isAuthenticated()) {
        return;
    }

    try {
        $db = getDB();
        $stmt = $db->prepare('
            INSERT INTO activities (type, description, entity_type, entity_id, metadata, user_id)
            VALUES (?, ?, ?, ?, ?, ?)
        ');
        $stmt->execute([
            $type,
            $description,
            $entityType,
            $entityId,
            $metadata ? json_encode($metadata) : null,
            $_SESSION['user_id'],
        ]);
    } catch (Exception $e) {
        error_log('Activity log failed: ' . $e->getMessage());
    }
}

/**
 * Handle CORS (if needed)
 */
function handleCors(): void {
    global $config;

    $allowedOrigins = $config['security']['allowed_origins'] ?? [];

    if (empty($allowedOrigins)) {
        return;
    }

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, $allowedOrigins)) {
        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');
    }

    if (getMethod() === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

// Handle CORS
handleCors();
