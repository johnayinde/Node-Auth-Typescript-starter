import PostModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';

export default class PostService {
    /**
     * Create a new post
     */
    static async create(title: string, body: string): Promise<Post> {
        try {
            const post = PostModel.create({ title, body });
            console.log('created post service', post);

            return post;
        } catch (error) {
            throw new Error('Unable to create post');
        }
    }
}
