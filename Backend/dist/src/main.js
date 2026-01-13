"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, { logger: ['error', 'warn', 'log', 'debug', 'verbose'] });
        app.setGlobalPrefix('api');
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }));
        app.enableCors({
            origin: process.env.FRONTEND_URL || 'http://localhost:4200',
            credentials: true,
        });
        const port = process.env.PORT || 3003;
        await app.listen(port);
        const server = app.getHttpServer();
        const router = server._events.request;
        console.log(`✓ Application is running on: http://localhost:${port}/api`);
        console.log('✓ Operator routes should be available at:');
        console.log('  POST /api/operators/register (requires JWT)');
        console.log('  GET /api/operators/my-operator (requires JWT)');
        console.log('  GET /api/operators (requires JWT + role)');
        console.log('  GET /api/operators/:id (requires JWT + role)');
        console.log('  PUT /api/operators/:id (requires JWT + role)');
        console.log('  POST /api/operators/:id/submit (requires JWT + role)');
        console.log('  DELETE /api/operators/:id (requires JWT + role)');
        console.log('');
        console.log('⚠️  IMPORTANT: If you still get 404 errors, ensure:');
        console.log('  1. Backend was restarted after code changes');
        console.log('  2. No compilation errors in the console');
        console.log('  3. Database connection is successful');
        console.log('  4. OperatorModule is loaded (check imports above)');
    }
    catch (error) {
        console.error('✗ Failed to start application:', error);
        console.error('Error details:', error.message);
        if (error.stack) {
            console.error('Stack trace:', error.stack);
        }
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map