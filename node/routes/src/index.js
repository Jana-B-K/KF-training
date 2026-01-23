import express from 'express'
import userRouter from './route/usersRouter.js'
import productRouter from './route/productRouter.js'
import cookieParser from 'cookie-parser';
import session from 'express-session'
import passport from 'passport';
import '../src/strategies/local-strategy.js'
import mongoose from 'mongoose';

const app = express();

mongoose
   .connect("mongodb+srv://janakumar9843_db_user:1234@cluster0.xspdewz.mongodb.net/?appName=Cluster0")
   .then(() => console.log("Connected to database"))
   .catch((err) => console.log(`Error: ${err}`))

const PORT = 2000;

app.use(express.json());
app.use(cookieParser("This is secret"))
app.use(session({
   secret: "this is secret",
   saveUninitialized: false,
   resave: false,
   cookie: {
      maxAge: 60000 * 60, // 1 hour
   }
}))

app.use(passport.initialize());
app.use(passport.session())
app.use(userRouter)
app.use(productRouter)

// Test route - can remain public for testing
app.get('/', (req, res) => {
   res.cookie("user", "Admin", {maxAge: 60000 * 60, signed: true})
   console.log('=== Session Info ===');
   console.log('Session ID:', req.sessionID);
   console.log('==================');
   res.send("Hello");
})

// Login route - authenticates user and creates session
app.post(
  '/api/auth',
  passport.authenticate('local'),
  (req, res) => {
    res.send({ msg: "Authenticated successfully", user: { username: req.user.username, age: req.user.age } });
  }
);

// Check authentication status
app.get('/api/auth/status', (req, res) => {
   console.log("Inside auth/status")
   
   if(req.user) {
      return res.send({ 
         authenticated: true, 
         user: { 
            username: req.user.username, 
            age: req.user.age,
            id: req.user._id 
         } 
      });
   }
   return res.sendStatus(401);
})

// Logout route
app.post('/api/auth/logout', (req, res) => {
   if(!req.user) return res.status(401).send({msg: "User doesn't logged in yet"});
   
   req.logout((err) => {
      if(err) return res.sendStatus(500);
      res.send({ msg: "Logged out successfully" });
   })
})

app.listen(PORT, () => { 
    console.log(`Server is listening on http://localhost:${PORT}`)
})