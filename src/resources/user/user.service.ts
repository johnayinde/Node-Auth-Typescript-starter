import { Request, NextFunction, Response } from 'express';
import UserModel from '@/resources/post/post.model';
import User from '@/resources/user/user.interface';
import userModel from './user.model';
import { decodeToken } from '@/utils/token';
import { encodeToken } from './../../utils/token';

export default class UserService {
    /**
     * Create a new User
     */

    static async registerUser(
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<string | Error> {
        try {
            const user = await userModel.create({
                name,
                email,
                password,
                role,
            });

            const accessToken = encodeToken(user);
            return accessToken;
        } catch (error) {
            return new Error('Unable to create a user');
        }
    }

    /**
     * login a User
     */

    static async loginUser(
        email: string,
        password: string
    ): Promise<Error | string> {
        try {
            const user = await userModel.findOne({ email });

            if (!user)
                throw new Error('Unable to fine user with tha Email Address');

            if (await user.isValidPassword(password)) {
                return encodeToken(user);
            }
            throw new Error('Invalid credentials');
        } catch (error) {
            throw new Error('Unable to login user');
        }
    }
}
