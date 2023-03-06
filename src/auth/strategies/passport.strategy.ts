/* eslint-disable prettier/prettier */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.services';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private userServices: UserService) {
        super({ usernameField: 'login', passwordField: 'password' });
    }

    async validate(login, password): Promise<any> {
        if ((typeof (login) !== 'string' || typeof (password) !== 'string') || (!login || !password))
            throw new HttpException('the body does not contain required fields or is of the wrong type', HttpStatus.BAD_REQUEST);

        const user = await this.userServices.getByName(login);
        if (!user) throw new HttpException('user not found or password not valid ', HttpStatus.FORBIDDEN);

        const passwordMatches = bcrypt.compareSync(password, user.password);
        if (!passwordMatches)
            throw new HttpException('user not found or password not valid ', HttpStatus.FORBIDDEN);

        return user;
    }


}