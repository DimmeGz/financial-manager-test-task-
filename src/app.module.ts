import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DB_CONFIG, JWT_CONFIG, VALIDATION_SCHEMA } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesModule } from './categories/categories.module';
import { PaymentsModule } from './payments/payments.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validationSchema: VALIDATION_SCHEMA }),
    JwtModule.register(JWT_CONFIG),
    TypeOrmModule.forRoot(DB_CONFIG),
    AuthModule,
    CategoriesModule,
    PaymentsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
