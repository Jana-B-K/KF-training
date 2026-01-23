import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../mongoose/schemas/user.js';
import { comparePassword } from '../utils/helper.js';

passport.serializeUser((user, done) => {
    console.log("Inside serialize")
    done(null, user.id);
})

passport.deserializeUser(async(id, done) => {
    console.log("Inside deserialize")
    try{
        const findUser = await User.findById(id);
        if(!findUser) throw new Error ("User not found")
        done(null, findUser)
    }catch(err){
        done(err,null)
    }
})

// export default passport.use(
//   new Strategy(
//     { usernameField: "username", passwordField: "password" },
//     async (username, password, done) => {
//       console.log("Inside strategy");
//       try {
//         const findUser = await User.findOne({ username: username });
//         if (!findUser) throw new Error("Username not found");

//         if (!comparePassword(password, findUser.password))
//           throw new Error("Invalid credentials");

//         done(null, findUser);
//       } catch (err) {
//         done(err, null);
//       }
//     }
//   )
// );
export default passport.use(
  new Strategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
      try {
        console.log("username from request:", username);

        const user = await User.findOne({ username });
        if (!user) return done(null, false);

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) return done(null, false);

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

