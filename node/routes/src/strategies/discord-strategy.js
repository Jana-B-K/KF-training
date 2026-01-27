import passport from "passport";
import { Strategy } from "passport-discord";
import { DiscordUser } from "../mongoose/schemas/discord-user.js";

export default passport.use(
  new Strategy(
    {
      clientID: "1465603097173950623",
      clientSecret: "dV8RXq9e_FX9bpwyX_Ej4FMYrueQNE_a",
      callbackURL: "http://localhost:4040/api/auth/discord/redirect",
      scope: ["identify"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let findUser = await DiscordUser.findOne({ discordId: profile.id });

        if (!findUser) {
          findUser = await DiscordUser.create({
            username: profile.username,
            discordId: profile.id,
          });
        }

        findUser.provider = "discord"; // ✅ REQUIRED
        return done(null, findUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
