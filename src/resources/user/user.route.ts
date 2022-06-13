import { Router } from 'express';
import validationMiddleware from '@/middleware/validation.middleware';
import { validatePost } from '@/resources/post/post.validation';
import PostController from '@/resources/post/post.controller';
import { validateLoginUser, validateRegisterUser } from './user.validation';
import UserController from './user.controller';
import authenticated from '@/middleware/authenticated.middleware';

const userRoute = Router();

userRoute
    .route('/register')
    .post(validationMiddleware(validateRegisterUser), UserController.register);

userRoute
    .route('/login')
    .post(validationMiddleware(validateLoginUser), UserController.login);

userRoute.route('/').get(authenticated, UserController.getUser);

export default userRoute;
