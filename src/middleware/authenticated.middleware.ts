import userModel from '@/resources/user/user.model';
import HttpException from '@/utils/exceptions/http.exception';
import Token from '@/utils/interfaces/token.interface';
import { decodeToken } from '@/utils/token';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '@/resources/user/user.interface';

export default async function authentictionMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const bearer = req.headers.authorization;

    if (!bearer) return res.status(401).json({ error: 'Unauthorised' });

    const accessToken = bearer.split(' ')[1];
    console.log(accessToken);

    try {
        const payload: Token | jwt.JwtPayload = decodeToken(accessToken);
        if (payload instanceof jwt.JsonWebTokenError)
            return next(new HttpException(401, 'Unauthorised'));

        const user = await userModel
            .findById(payload.id)
            .select('-password')
            .exec();

        req.user = user as User;

        return next();
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
}
