"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const dotenv_1 = require("dotenv");
const system_user_entity_1 = require("../src/modules/system-user/system-user.entity");
const enums_1 = require("../src/shared/enums");
(0, dotenv_1.config)();
async function resetUserPassword() {
    const dataSource = new typeorm_1.DataSource({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 8079,
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'ARSOMarks',
        entities: [system_user_entity_1.SystemUser],
    });
    try {
        await dataSource.initialize();
        console.log('Database connection established');
        const userRepository = dataSource.getRepository(system_user_entity_1.SystemUser);
        const email = process.argv[2] || 'king@mail.com';
        const newPassword = process.argv[3] || 'qwerty123';
        let user = await userRepository.findOne({
            where: { email },
        });
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(newPassword, saltRounds);
        if (!user) {
            console.log(`User with email ${email} not found. Creating new user...`);
            user = userRepository.create({
                email,
                fullName: 'King User',
                passwordHash,
                role: enums_1.UserRole.SUPER_ADMIN,
                roles: [enums_1.UserRole.SUPER_ADMIN],
                isActive: true,
                emailVerified: true,
            });
            await userRepository.save(user);
            console.log('✅ User created successfully!');
        }
        else {
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
    }
    catch (error) {
        console.error('Error resetting password:', error);
        process.exit(1);
    }
}
resetUserPassword();
//# sourceMappingURL=reset-user-password.js.map