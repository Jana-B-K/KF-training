import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GoogleUser } from "../mongoose/schemas/google-user.js";

export default passport.use(
  new GoogleStrategy(
    {
      clientID: "80662128516-1vvfl5d9ufrbqbrm6800iiqhgmk6ojif.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4040/api/auth/google/redirect",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await GoogleUser.findOne({ googleId: profile.id });

        if (!user) {
          user = await GoogleUser.create({
            username: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value,
          });
        }

        user.provider = "google"; // ✅ REQUIRED
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
