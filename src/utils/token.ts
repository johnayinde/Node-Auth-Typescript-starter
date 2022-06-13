import jwt from 'jsonwebtoken';
import Token from './interfaces/token.interface';
import User from '@/resources/user/user.interface';

export const encodeToken = (user: User) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: '1d',
    });
};

export const decodeToken = (token: string) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
    if (payload instanceof Error) throw new Error(payload.message);

    return payload as Token;
};
