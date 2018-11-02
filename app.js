const express = require("express");
const bodyParser = require("body-parser");
//const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const app = express();


const config = require("./config/config");
const router = require("./router/router");


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieSession({
  name: "session",
  keys: ["rutabaga"],
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(router);

app.listen(config.port, () => {
  var time = new Date().toLocaleTimeString();
  console.log(`[${time}] Listening on port ${config.port}`);
});