import { env } from 'process';
import { Strategy, } from 'passport-jwt';
import User from '../models/user.model.js';
const { JWT_SECRET } = env;
const options = {
    jwtFromRequest: (req) => req.cookies.access_token,
    secretOrKey: JWT_SECRET,
};
const verify = (payload, done) => {
    const { id } = payload;
    User.findById(id)
        .then((user) => done(null, user))
        .catch((err) => done(err));
};
const strategy = new Strategy(options, verify);
export default (p) => p.use('jwt', strategy);
