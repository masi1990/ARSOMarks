"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const fs_1 = require("fs");
const path_1 = require("path");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
async function runMigration() {
    const migrationFile = process.argv[2];
    if (!migrationFile) {
        console.error('Usage: npm run run-migration <migration-file>');
        console.error('Example: npm run run-migration migrations/018_add_jsonb_columns_to_application_registrations.sql');
        process.exit(1);
    }
    const dataSource = new typeorm_1.DataSource({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 8079,
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'ARSOMarks',
    });
    try {
        await dataSource.initialize();
        console.log('Database connection established');
        const migrationPath = (0, path_1.join)(process.cwd(), migrationFile);
        console.log(`Reading migration file: ${migrationPath}`);
        const migrationSQL = (0, fs_1.readFileSync)(migrationPath, 'utf-8');
        console.log('Executing migration...');
        await dataSource.query(migrationSQL);
        console.log('✅ Migration completed successfully!');
    }
    catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
    finally {
        await dataSource.destroy();
    }
}
runMigration();
//# sourceMappingURL=run-migration.js.map