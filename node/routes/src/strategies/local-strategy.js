import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../mongoose/schemas/user.js';
import { comparePassword } from '../utils/helper.js';

export default passport.use(
  new Strategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false);

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) return done(null, false);

        user.provider = "local";   // ✅ REQUIRED
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
