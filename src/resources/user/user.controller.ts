import { Request, Response, NextFunction } from 'express';
import UserService from '@/resources/user/user.service';
import HttpException from './../../utils/exceptions/http.exception';
import User from '@/resources/user/user.interface';

class UserController {
    static register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, email, password } = req.body as User;

            const token = await UserService.registerUser(
                name,
                email,
                password,
                'User'
            );

            res.status(201).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;

            const token = await UserService.loginUser(email, password);

            res.status(201).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    static getUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        if (!req.user) return next(new HttpException(404, 'No usser found'));

        res.status(200).json({ user: req.user });
    };
}

export default UserController;
