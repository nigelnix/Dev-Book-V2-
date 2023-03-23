import { Router } from 'express';
import passport from 'passport';
import { createPost, getAllPosts, getPost, deletePost, likePost} from '../controllers/post.controller.js';
import { postUploads } from '../middleware/multerUploads.middleware.js';
const router = Router();
router.use(passport.authenticate('jwt', { session: false }));
router.route('/').post(postUploads, createPost).get(getAllPosts);
router.route('/:id').get(getPost).delete(deletePost).patch(likePost);


export { router as default };
