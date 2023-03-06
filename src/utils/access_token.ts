/* eslint-disable prettier/prettier */
import * as jwt from 'jsonwebtoken';

export function generateAccesstoken(userId, login, refresh = false): string {
    const payload = refresh ? {
        userId,
        login,
        'refresh': true
    } : {
        userId,
        login
    }

    const secretKey = refresh ? process.env.JWT_SECRET_REFRESH_KEY : process.env.JWT_SECRET_KEY
    return jwt.sign(payload, secretKey, { expiresIn: "24h" });
}
