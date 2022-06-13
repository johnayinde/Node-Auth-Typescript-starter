import { Request, Response, NextFunction } from 'express';
import PostService from '@/resources/post/post.service';
import HttpException from './../../utils/exceptions/http.exception';

class PostController {
    static createPost = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { body, title } = req.body;

            const post = await PostService.create(title, body);

            res.status(201).json({ post });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default PostController;
