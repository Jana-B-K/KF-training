import express from 'express'
import userRouter from './route/usersRouter.js'
import productRouter from './route/productRouter.js'
import cookieParser from 'cookie-parser';
import session from 'express-session'
import passport from 'passport';
import  '../src/strategies/local-strategy.js'



const app = express();
const PORT = 2000;
app.use(express.json());
app.use(cookieParser("This is secret"))
app.use(session({
   secret: "this is secret",
   saveUninitialized: false,
   resave: false,
   cookie: {
      maxAge: 6000 *6,
   }
}))

app.use(passport.initialize());
app.use(passport.session())
app.use(userRouter)
app.use(productRouter)


app.get('/', (req, res) => {
   res.cookie("user", "Admin", {maxAge: 60000 *60, signed:true})
       console.log('=== Session Info ===');
      console.log('Session ID:', req.sessionID);
      // console.log('Signed Cookies:', req.signedCookies);
      // console.log('Session Data:', req.session);
      console.log('==================');
     res.send("Hello");

})

app.post(
  '/api/auth',
  passport.authenticate('local'),
  (req, res) => {
    res.send("Authenticated successfully");
  }
);

app.get('/api/auth/status', (req, res) => {
   console.log("inside auth/status")
   console.log(req.session)
   if(req.user) return res.send(req.user)
   return res.sendStatus(401)
})

app.post('/api/auth/logout', (req, res) => {
   if(!req.user) return res.status(401).send({msg: "user dosen't loged yet"});
   req.logout((err) => {
      if(err) return res.sendStatus(401);
      res.sendStatus(200);
   })
})



 app.listen(PORT, () => { 
    console.log(`This port is listen in http://localhost:${PORT}`)
 })