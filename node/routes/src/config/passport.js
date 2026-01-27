import passport from "passport";
import { User } from "../mongoose/schemas/user.js";
import { GoogleUser } from "../mongoose/schemas/google-user.js";
import { DiscordUser } from "../mongoose/schemas/discord-user.js";

passport.serializeUser((user, done) => {
  done(null, {
    id: user._id,
    provider: user.provider, // 'local' | 'google' | 'discord'
  });
});

passport.deserializeUser(async (data, done) => {
  try {
    let user;

    switch (data.provider) {
      case "google":
        user = await GoogleUser.findById(data.id);
        break;

      case "discord":
        user = await DiscordUser.findById(data.id);
        break;

      default:
        user = await User.findById(data.id);
    }

    done(null, user || null);
  } catch (err) {
    done(err);
  }
});
