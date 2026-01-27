import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

import userRouter from "./route/usersRouter.js";
import productRouter from "./route/productRouter.js";

import "./config/passport.js";
import "./strategies/local-strategy.js";
import "./strategies/discord-strategy.js";
import "./strategies/google-strategy.js";

const app = express();
const PORT = 4040;
console.log("🔥 INDEX FILE LOADED");




// ---- MongoDB ----
mongoose
  .connect(
    "mongodb+srv://janakumar9843_db_user:1234@cluster0.xspdewz.mongodb.net/?appName=Cluster0"
  )
  .then(() => console.log("Connected to database"))
  .catch(console.error);

// ---- Middleware ----
app.use(express.json());
app.use(cookieParser("This is secret"));

app.use(
  session({
    secret: "this is secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://janakumar9843_db_user:1234@cluster0.xspdewz.mongodb.net/?appName=Cluster0",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ---- Routes ----
app.get("/", (req, res) => res.send("Hello"));

app.post(
  "/api/auth",
  passport.authenticate("local"),
  (req, res) => res.send({ msg: "Authenticated" })
);

app.get("/api/auth/status", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  res.send({
    authenticated: true,
    user: {
      id: req.user._id,
      username: req.user.username,
      provider: req.user.provider,
    },
  });
});

app.post("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout(() => res.send({ msg: "Logged out" }));
});

// ---- OAuth ----
app.get("/api/auth/google", passport.authenticate("google"));

app.get(
  "/api/auth/google/redirect",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => res.sendStatus(200)
);

app.get("/api/auth/discord", passport.authenticate("discord"));

app.get(
  "/api/auth/discord/redirect",
  passport.authenticate("discord", { failureRedirect: "/" }),
  (req, res) => res.sendStatus(200)
);

app.use(userRouter);
app.use(productRouter);

// ---- Start server ----
app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`);
});
