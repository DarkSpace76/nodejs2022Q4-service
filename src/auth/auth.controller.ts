/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Post,
    UseGuards,
    Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/utils/DB/entities/DBUsers';
import { LocalAuthGuard } from './strategies/local-auth.guard';
import { JwtRefAuthGuard } from './strategies/jwt-ref.guard';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req) {
        return this.authService.login(req.user);

    }

    @UseGuards(JwtRefAuthGuard)
    @Post('refresh')
    refresh(@Request() req) {
        return this.authService.login(req.user);

    }
}