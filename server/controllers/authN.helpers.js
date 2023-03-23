import { env } from 'process';
import jwt from 'jsonwebtoken';
const { JWT_SECRET, JWT_EXPIRES } = env;
const signToken = (id) => {
    const options = {
        expiresIn: JWT_EXPIRES,
    };
    return jwt.sign({ id }, JWT_SECRET, options);
};
const verifyFileUpload = (files) => {
    if (!files) {
        return { userBanner: undefined, userPic: undefined };
    }
    let userBanner = undefined;
    let userPic = undefined;
    if (files.userBanner) {
        userBanner = files.userBanner[0].path;
    }
    if (files.userPic) {
        userPic = files.userPic[0].path;
    }
    return { userBanner, userPic };
};
export { signToken, verifyFileUpload };
