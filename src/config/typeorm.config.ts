import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const buildTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get('DB_HOST') ?? 'localhost',
    port: configService.get('DB_PORT') ?? 5432,
    username: configService.get('DB_USER') ?? 'ethan-pro',
    password: configService.get('DB_PASSWORD') ?? '',
    database: configService.get('DB_NAME') ?? 'nestjs-fundly',
    synchronize: true,
    autoLoadEntities: true,
    // dropSchema: true, // A ENLEVER EN PRODUCTION
  };
};
