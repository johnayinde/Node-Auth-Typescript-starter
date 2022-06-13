import { Router } from 'express';
import validationMiddleware from '@/middleware/validation.middleware';
import { validatePost } from '@/resources/post/post.validation';
import PostController from '@/resources/post/post.controller';

const postRoute = Router();

postRoute
    .route('/posts')
    .post(validationMiddleware(validatePost), PostController.createPost);

export default postRoute;
