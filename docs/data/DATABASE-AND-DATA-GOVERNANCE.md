# Database and Data Management Governance

Databases and database-management networks are shared foundations for the ecosystem. Data design must support security, correctness, observability, portability, and recovery.

## Required data controls

- Data classification and ownership
- Explicit schemas and migration history
- Validation at application and database boundaries
- Least-privilege service accounts
- Separate development, staging, and production databases
- Encryption in transit and at rest where supported
- Secrets stored outside source code
- Audit records for sensitive operations
- Backup schedules and restoration tests
- Retention, export, correction, and deletion rules
- Tenant, project, and environment isolation
- Monitoring for health, capacity, errors, and unusual access

## Database quick actions

- Design a schema.
- Review normalization and indexes.
- Generate migrations.
- Validate a migration in isolation.
- Compare schema versions.
- Inspect slow queries.
- Check connection pools.
- Review permissions.
- Test backup restoration.
- Export approved data.
- Redact sensitive fields.
- Detect orphaned records.
- Check data quality.
- Create a retention report.
- Prepare a disaster-recovery exercise.

## AI usage rules

AI may propose schemas, queries, migrations, reports, and optimizations. Generated database changes must be reviewed, tested against non-production data, and approved before production execution.

AI must not receive unrestricted production exports, secrets, credentials, or unnecessary personal data. Queries that alter or delete data require explicit approval and a verified recovery path.

## Documentation requirements

Every database must have an owner, purpose, data dictionary, relationship diagram, access model, backup plan, migration policy, monitoring plan, and recovery procedure.
