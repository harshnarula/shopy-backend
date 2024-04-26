import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { data } from "../utils/static.mjs";
import { User } from "../mongoose/schemas/user.mjs";

// Serialize and deserialize user methods
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id).exec();
    done(null, user);
});

// Configure the LocalStrategy
passport.use(new LocalStrategy(async (username, password, done) => {

    try {
        const user = await User.findOne({ username }).exec();
        if (!user) {
            return done(null, false, { message: "User not Found" });
        }
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return done(null, false, { message: "Bad Credentials" });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

export default passport;
