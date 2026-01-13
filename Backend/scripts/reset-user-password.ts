import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { SystemUser } from '../src/modules/system-user/system-user.entity';
import { UserRole } from '../src/shared/enums';

config();

async function resetUserPassword() {
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

    // Get email from command line argument or use default
    const email = process.argv[2] || 'king@mail.com';
    const newPassword = process.argv[3] || 'qwerty123';

    let user = await userRepository.findOne({
      where: { email },
    });

    // Hash the new password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    if (!user) {
      // Create user if it doesn't exist
      console.log(`User with email ${email} not found. Creating new user...`);
      user = userRepository.create({
        email,
        fullName: 'King User',
        passwordHash,
        role: UserRole.SUPER_ADMIN,
        roles: [UserRole.SUPER_ADMIN],
        isActive: true,
        emailVerified: true,
      });
      await userRepository.save(user);
      console.log('✅ User created successfully!');
    } else {
      // Update existing user
      user.passwordHash = passwordHash;
      user.emailVerified = true;
      user.isActive = true;
      user.failedLoginAttempts = 0;
      user.lockedUntil = null;
      await userRepository.save(user);
      console.log('✅ Password reset successful!');
    }

    console.log(`\nLogin credentials:`);
    console.log(`Email:    ${email}`);
    console.log(`Password: ${newPassword}`);
    console.log('\n⚠️  Please change the password after first login!');

    await dataSource.destroy();
  } catch (error) {
    console.error('Error resetting password:', error);
    process.exit(1);
  }
}

resetUserPassword();

