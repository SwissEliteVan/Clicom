# CRM Application - Leads & Sales

A complete, self-contained CRM web application built with PHP 8+ and MySQL. Designed for easy deployment on shared hosting (Hostinger, OVH, etc.) without dependencies on Node.js or frameworks.

## Features

- **Lead Management**: Track leads with status, source, priority, scoring
- **Deal Pipeline**: Visual Kanban-style pipeline with customizable stages
- **Task Management**: Assign and track tasks linked to leads/deals
- **Company & Contacts**: Basic company and contact management
- **Activity Timeline**: Notes and activity history
- **Multi-language**: French, English, German, Italian
- **Role-based Access**: Admin and User roles
- **CSV Export**: Export leads and deals data
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessibility**: WCAG 2.1 AA compliant
- **Security**: CSRF protection, prepared statements, secure sessions

## Requirements

- PHP 8.0 or higher
- MySQL 5.7+ or MariaDB 10.3+
- Apache with mod_rewrite enabled
- HTTPS recommended for production

## Quick Installation

1. **Upload files** to your hosting via FTP or File Manager
2. **Create MySQL database** in your hosting panel
3. **Import SQL schema**: Run `sql/schema.sql` then `sql/seed.sql`
4. **Configure**: Copy `config/config.example.php` to `config/config.php` and edit
5. **Set permissions**: Ensure `config/` is not publicly accessible
6. **Access**: Navigate to your domain

See `docs/hosting-hostinger.md` for detailed Hostinger instructions.

## Default Credentials

After running the seed file:
- **Admin**: admin@example.com / Admin123!
- **User**: user@example.com / User123!

**Change these immediately in production!**

## Directory Structure

```
/
├── index.php           # Entry point
├── .htaccess           # Apache configuration
├── assets/             # CSS, JS, images
├── config/             # Configuration (protected)
├── api/                # REST API endpoints
├── views/              # PHP templates
├── sql/                # Database schemas
└── docs/               # Documentation
```

## API Endpoints

All API endpoints return JSON: `{ "ok": boolean, "data": any, "error": string }`

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/auth` | POST | Login/logout |
| `/api/users` | GET, POST, PUT, DELETE | User management (admin) |
| `/api/leads` | GET, POST, PUT, DELETE | Lead CRUD |
| `/api/deals` | GET, POST, PUT, DELETE | Deal CRUD |
| `/api/tasks` | GET, POST, PUT, DELETE | Task CRUD |
| `/api/companies` | GET, POST, PUT, DELETE | Company CRUD |
| `/api/contacts` | GET, POST, PUT, DELETE | Contact CRUD |
| `/api/notes` | GET, POST, PUT, DELETE | Notes CRUD |
| `/api/activities` | GET, POST | Activity log |

## Security

- All write operations require CSRF token
- Passwords hashed with bcrypt
- Prepared statements for all queries
- Session security with httponly, secure, samesite cookies
- Security headers via .htaccess
- Input validation on both client and server

See `docs/security-checklist.md` for production hardening.

## Customization

Edit `config/config.php` to customize:
- Application name and branding
- Database connection
- Session settings
- Feature toggles

## Languages

The application supports:
- Francais (fr)
- English (en)
- Deutsch (de)
- Italiano (it)

Add languages by editing `assets/js/i18n.js`.

## License

MIT License - Use freely for personal or commercial projects.

## Support

This is a template application. Customize as needed for your use case.
