const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();


const config = require("./config/config");
const router = require("./router/router");


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use("/", router);

app.listen(config.port, () => {
  console.log("Listening on port " + config.port + "!");
});