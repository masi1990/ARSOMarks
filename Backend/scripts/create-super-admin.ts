import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SystemUser } from '../src/modules/system-user/system-user.entity';
import { UserRole } from '../src/shared/enums';
import { config } from 'dotenv';

// Load environment variables
config();

async function createSuperAdmin() {
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
    console.log('Database connection established');

    const userRepository = dataSource.getRepository(SystemUser);

    // Check if super admin already exists
    const existingAdmin = await userRepository.findOne({
      where: { email: process.env.SUPER_ADMIN_EMAIL || 'admin@arso-oran.org' },
    });

    if (existingAdmin) {
      console.log('Super admin already exists. Updating password...');
      
      // Update password
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(
        process.env.SUPER_ADMIN_PASSWORD || 'Admin@123!',
        saltRounds,
      );

      existingAdmin.passwordHash = passwordHash;
      existingAdmin.role = UserRole.SUPER_ADMIN;
      existingAdmin.isActive = true;
      existingAdmin.emailVerified = true;
      existingAdmin.fullName = process.env.SUPER_ADMIN_NAME || 'ARSO Super Administrator';

      await userRepository.save(existingAdmin);
      console.log('Super admin password updated successfully');
    } else {
      // Create new super admin
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(
        process.env.SUPER_ADMIN_PASSWORD || 'Admin@123!',
        saltRounds,
      );

      const superAdmin = userRepository.create({
        email: process.env.SUPER_ADMIN_EMAIL || 'admin@arso-oran.org',
        fullName: process.env.SUPER_ADMIN_NAME || 'ARSO Super Administrator',
        passwordHash,
        role: UserRole.SUPER_ADMIN,
        isActive: true,
        emailVerified: true,
        organizationType: 'ARSO_SECRETARIAT',
      });

      await userRepository.save(superAdmin);
      console.log('Super admin created successfully');
    }

    console.log('\nSuper Admin Credentials:');
    console.log('Email:', process.env.SUPER_ADMIN_EMAIL || 'admin@arso-oran.org');
    console.log('Password:', process.env.SUPER_ADMIN_PASSWORD || 'Admin@123!');
    console.log('\n⚠️  Please change the default password after first login!');

    await dataSource.destroy();
  } catch (error) {
    console.error('Error creating super admin:', error);
    process.exit(1);
  }
}

createSuperAdmin();

