import { join, dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import JWTStrategy from "./middleware/passportJWT.middleware.js";
import authRouter from "./routers/auth.router.js";
import userRouter from "./routers/user.router.js";
import postRouter from "./routers/post.router.js";
import commentRouter from "./routers/comment.router.js";
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadsFolderPath = join(__dirname, "uploads");
const corsConfig = {
  origin: "http://localhost:8080",
  credentials: true,
};
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(morgan("dev"));
app.use(passport.initialize());
JWTStrategy(passport);
app.use("/uploads", express.static(uploadsFolderPath));
app.use("/api", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

export { app as default, __dirname };
