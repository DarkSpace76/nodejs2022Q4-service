/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/passport.strategy';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { UserService } from 'src/user/user.services';
import { DbModule } from 'src/db.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt.refresh.strategy';

@Module({
    imports: [DbModule, PassportModule, JwtModule.register({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: '1d' },
    })],
    controllers: [AuthController],
    providers: [AuthService, UserService, LocalStrategy, JwtStrategy, JwtRefreshStrategy]
})
export class AuthModule { }
