const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DATABASE_URL,
    ssl: true,
  },
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ROOT
app.get("/", (req, res) => {
  res.send("Nu fungerar det minsann!");
});

// /SIGNIN
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

// /REGISTER
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

// /PROFILE/:ID
app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

// /IMAGE
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

// Store hash in your password DB.
// bcrypt.hash(password, null, null, function (err, hash) {
//   console.log(hash);
// });

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});

/* PLANNING OF THE API
(root-route) /--> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/
