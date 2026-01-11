# Backend Architecture (NestJS + TypeORM)

This directory is a starter layout for the ARSO Marks backend. The migration in `migrations/001_initial_schema.sql` creates the full database schema (PostgreSQL) for NSBs, licensing, documents, workflow, and reference data.

## Suggested module layout
```
src/
  modules/
    nsb-management/
      controllers/
      services/
      dtos/
      entities/
      nsb-management.module.ts
    licensing/
      controllers/
      services/
      dtos/
      entities/
      licensing.module.ts
    reference-data/
      countries/ regions/ recs/ acap-schemes/
    documents/
      document-management.module.ts
      services/document-storage.service.ts
  common/        # decorators, filters, guards, interceptors, pipes, utils
  shared/        # enums, interfaces, constants
```

## Running the migration
1) Ensure PostgreSQL has the `pgcrypto` extension installed.
2) Execute the migration (example):
```sh
psql -d your_db -f migrations/001_initial_schema.sql
```
3) Point TypeORM to this migration file (or split it) and generate entities to match the schema.

## Notes
- Audit columns (`created_by`, `updated_by`, etc.) reference `system_users`; replace with your auth/user table if needed.
- Application and license numbers use sequences for human-friendly identifiers.
- Enum types are defined up front to keep data integrity aligned with the DTOs.

