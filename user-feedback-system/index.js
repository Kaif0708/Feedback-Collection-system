const express = require("express");

const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

require("./models/User");
require("./models/Survey");
require("./services/passport");
const app = express();
app.use(bodyParser.json());
const mongoose = require("mongoose");
const keys = require("./config/keys");

mongoose.connect(keys.mongooseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());
//const survey ={title : 'React With Nodejs' , subject:'Learn to build mail system', recipients:'noonaliahsan@gmail.com', body:'Feedback System with Nodejs and react learning'}
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(
    '<h1>React With Nodejs</h1><br> <a href="/auth/google ">Sign In With google</a>'
  );
});

app.listen(PORT);
