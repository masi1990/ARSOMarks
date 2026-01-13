# Authentication Setup Guide

This guide explains how to set up and use the authentication system for ARSO Marks.

## Prerequisites

1. PostgreSQL database with the schema migrations applied
2. Node.js and npm installed
3. Gmail account with App Password enabled (for email notifications)

## Database Setup

1. Run the initial schema migration:
   ```bash
   psql -d ARSOMarks -f migrations/001_initial_schema.sql
   ```

2. Run the authentication schema migration:
   ```bash
   psql -d ARSOMarks -f migrations/002_auth_schema.sql
   ```

## Environment Configuration

Create a `.env` file in the `Backend` directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=8079
DB_USER=postgres
DB_PASS=your_password_here
DB_NAME=ARSOMarks

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Email Configuration (Gmail)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password

# Frontend URL
FRONTEND_URL=http://localhost:4200

# Server Configuration
PORT=3003

# Super Admin Configuration
SUPER_ADMIN_EMAIL=admin@arso-oran.org
SUPER_ADMIN_PASSWORD=Admin@123!
SUPER_ADMIN_NAME=ARSO Super Administrator
```

### Gmail App Password Setup

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to App Passwords (https://myaccount.google.com/apppasswords)
4. Generate a new app password for "Mail"
5. Copy the 16-character password and use it as `GMAIL_APP_PASSWORD`

## Installation

1. Install backend dependencies:
   ```bash
   cd Backend
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   cd Frontend
   npm install
   ```

## Creating Super Admin

After setting up the database and environment variables, create the super admin user:

```bash
cd Backend
npm run create-super-admin
```

This will create a super admin user with the credentials specified in your `.env` file.

**Important:** Change the default password after first login!

## Running the Application

### Backend

```bash
cd Backend
npm run start:dev
```

The API will be available at `http://localhost:3000/api`

### Frontend

```bash
cd Frontend
npm start
```

The frontend will be available at `http://localhost:4200`

## User Roles

The system supports the following roles based on ACAP standards:

- **SUPER_ADMIN**: ARSO Central Secretariat super administrator
- **ARSO_COUNCIL**: ARSO Council member
- **CACO_MEMBER**: ARSO Conformity Assessment Committee member
- **ARSO_SECRETARIAT**: ARSO Central Secretariat staff
- **ADVISORY_COMMITTEE**: Advisory Committee member
- **SMC_MEMBER**: Standards Management Committee member
- **NSB_ADMIN**: National Standards Body administrator
- **NSB_USER**: National Standards Body user
- **CB_ADMIN**: Certification Body administrator
- **CB_USER**: Certification Body user
- **OPERATOR**: Certified client/operator
- **ACCREDITATION_BODY**: Accreditation Body user
- **PUBLIC**: Public user (limited access)

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/profile` - Get current user profile (requires authentication)
- `POST /api/auth/logout` - Logout (client-side token removal)

### Protected Routes

Most routes require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Frontend Routes

- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/auth/forgot-password` - Forgot password page
- `/auth/reset-password?token=<token>` - Reset password page
- `/dashboard` - Dashboard (requires authentication)

## Security Features

1. **Password Hashing**: Passwords are hashed using bcrypt (10 salt rounds)
2. **JWT Tokens**: Secure token-based authentication
3. **Account Locking**: Accounts are locked after 5 failed login attempts for 30 minutes
4. **Password Reset**: Secure token-based password reset with 1-hour expiration
5. **Email Verification**: Email verification tokens (can be extended)
6. **Role-Based Access Control**: Guards and decorators for role-based authorization

## Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure the database `ARSOMarks` exists

### Email Not Sending

- Verify Gmail credentials in `.env`
- Check that App Password is correctly set
- Ensure 2-Step Verification is enabled on Gmail account

### JWT Token Issues

- Verify `JWT_SECRET` is set in `.env`
- Check token expiration settings
- Ensure frontend is sending token in Authorization header

## Next Steps

1. Customize role permissions based on your requirements
2. Add email verification flow
3. Implement password complexity requirements
4. Add audit logging for authentication events
5. Set up rate limiting for authentication endpoints

