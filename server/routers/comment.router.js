import { Router } from "express";
import { createComment } from "../controllers/comment.controller.js";
import passport from 'passport';


const router = Router();

router.use(passport.authenticate('jwt', { session: false }));
router.route("/:id").post(createComment);

export default router;
