import passport from 'passport';
import { Strategy } from 'passport-local';
import { users } from '../utils/constants.js'

passport.serializeUser((user, done) => {
    console.log("Inside serialize")
    done(null, user.id);
})
passport.deserializeUser((id, done) => {
        console.log("Inside deserialize")
    try{
        const filteredUser = users.find( user => user.id === id)
        if(!filteredUser){
            throw new Error ("User not found")
        }
        done(null, filteredUser)
    }catch(err){
        done(err,null)
    }
})

export default passport.use(
    new Strategy({ usernameField: "name", password: "password" }, (username, password, done) => {
            console.log("Inside strategy")
        try{
            const findUser = users.find( (user) => user.name === username);
            if( !findUser || findUser.password !== password){
                throw new Error("Invalid Credentials")
            }
            done(null, findUser)
        }catch(err){
            done(err, null)
        }
    })  
)