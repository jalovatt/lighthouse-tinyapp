const db = require("../database/database.js");
const controller = require("./controllerFunctions.js");


exports.getIndex = function (req, res) {
  if (req.cookies["user_id"]) {
    res.redirect("/urls");
  } else {
    res.redirect("/login");
  }
};


exports.getLogin = function (req, res) {
  res.render("login");
};

exports.postLogin = function (req, res) {

  var id = controller.validateLogin(req.body.email, req.body.pwd);
  if (!id) {
    res.status(403);
    res.render("login", {invalidLogin: true});
    return;
  }

  res.cookie("user_id", id);
  res.redirectLocal();
};

exports.postLogout = function (req, res) {
  res.clearCookie("user_id");
  res.redirect("/");
};

exports.getRegister = function (req, res) {

  res.render("register");
};

exports.postRegister = function (req, res) {

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

  res.cookie("user_id", id);
  res.redirectLocal();

};

exports.notFound = function (req, res) {
  res.render("not_found");
};