const db = require("../database/database.js");
const controller = require("./controllerFunctions.js");

exports.index = function (req, res) {
  res.send("Hello!");
};

exports.hello = function (req, res) {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
};

exports.login = function (req, res) {
  console.log("login");
  res.cookie("username", req.body.username);
  res.redirectLocal();
};

exports.logout = function (req, res) {
  res.clearCookie("username");
  res.redirectLocal();
};

exports.register = function (req, res) {

  res.render("register");
};

exports.registerUser = function (req, res) {

  let {email, pwd} = req.body;
  if (controller.userExists(email)) {
    //res.status(400);
    res.render("register", {userExists: true});
    return;
  }

  if (email === "" || pwd === "") {
    //res.status(400);
    res.render("register", {invalidData: true});
    return;
  }

  let id = controller.generateRandomString();
  db.users[id] = {id, email, pwd};

  res.cookie("username", id);
  res.redirectLocal();

};