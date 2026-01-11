# ARSO Marks Frontend (Angular 16)

## Quick start
- `npm install`
- `npm start` → http://localhost:4200
- API base: `src/environments/environment.ts` (`apiBase` defaults to `http://localhost:3000/api`).

## Multi-role and role requests
- Types (`src/app/shared/models/user.model.ts`):
  - `User` includes `roles: UserRole[]` plus legacy `role`.
  - `RoleRequest`, `RoleRequestStatus`, `CreateRoleRequest`, `DecideRoleRequest`.
- Auth service endpoints (`src/app/modules/auth/services/auth.service.ts`):
  - `requestRoles(payload: CreateRoleRequest)` → `POST /auth/role-requests`
  - `getMyRoleRequests()` → `GET /auth/role-requests/me`
  - `listRoleRequests()` → `GET /auth/role-requests` (approvers)
  - `decideRoleRequest(id, payload)` → `POST /auth/role-requests/:id/decision`
- Role helpers: `hasRole` / `hasAnyRole` now check both `roles` array and the fallback `role`.

## Scripts
- `npm start` – dev server with live reload
- `npm test` – unit tests
- `npm run build` – production build

