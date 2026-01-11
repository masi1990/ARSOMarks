import { randomBytes } from 'crypto';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { SystemUser } from '../src/modules/system-user/system-user.entity';
import { UserRole } from '../src/shared/enums';

config();

async function createDemoUser() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 8079,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'ARSOMarks',
    entities: [SystemUser],
  });

  try {
    await dataSource.initialize();
    // Ensure auth columns exist (for cases where auth migration hasn't run)
    await dataSource.query(`
      ALTER TABLE system_users
      ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255),
      ADD COLUMN IF NOT EXISTS password_reset_token VARCHAR(255),
      ADD COLUMN IF NOT EXISTS password_reset_expires TIMESTAMP,
      ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false,
      ADD COLUMN IF NOT EXISTS email_verification_token VARCHAR(255),
      ADD COLUMN IF NOT EXISTS last_login TIMESTAMP,
      ADD COLUMN IF NOT EXISTS failed_login_attempts INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS locked_until TIMESTAMP,
      ADD COLUMN IF NOT EXISTS phone VARCHAR(50),
      ADD COLUMN IF NOT EXISTS organization_id UUID,
      ADD COLUMN IF NOT EXISTS organization_type VARCHAR(50),
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    `);
    const repo = dataSource.getRepository(SystemUser);

    const email = process.env.DEMO_USER_EMAIL || 'jerry@mail.com';
    // Prefer env-supplied password; otherwise generate a random demo password to avoid hard-coding.
    const password =
      process.env.DEMO_USER_PASSWORD || randomBytes(8).toString('hex');

    let user = await repo.findOne({ where: { email } });

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    if (user) {
      user.passwordHash = passwordHash;
      user.role = UserRole.SUPER_ADMIN;
      user.isActive = true;
      user.emailVerified = true;
      user.fullName = user.fullName || 'Jerry User';
      await repo.save(user);
      console.log('Updated existing user:', email);
    } else {
      user = repo.create({
        email,
        fullName: 'Jerry User',
        passwordHash,
        role: UserRole.SUPER_ADMIN,
        isActive: true,
        emailVerified: true,
      });
      await repo.save(user);
      console.log('Created demo user:', email);
    }

    console.log('\nDemo login credentials:');
    console.log('Email:    ', email);
    console.log('Password: ', password);
  } catch (err) {
    console.error('Error creating demo user:', err);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

createDemoUser();


