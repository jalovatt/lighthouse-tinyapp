const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const router = require("./router/router");
const config = require("./config/config");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieSession({
  name: "session",
  keys: ["rutabaga"],
  maxAge: 24 * 60 * 60 * 1000
}));

// All views share a global stylesheet
app.use("/css", express.static(__dirname + "/css"));

app.use(router);

app.listen(config.port, () => {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] Listening on port ${config.port}`);
});