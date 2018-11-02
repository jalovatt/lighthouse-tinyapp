const controller = require("./indexFunctions.js");

exports.getIndex = function (req, res) {

  if (req.session.user_id) {
    res.redirect("/urls");
  } else {
    res.redirect("/login");
  }

};


exports.getLogin = function (req, res) {

  if (req.session.user_id) {
    res.redirect("/urls");
  } else {
    res.render("login");
  }

};

exports.postLogin = function (req, res) {

  const id = controller.validateLogin(req.body.email, req.body.pwd);

  if (!id) {
    res.status(403);
    res.render("login", {invalidLogin: true});
    return;
  }

  req.session.user_id = id;
  res.redirectLocal();

};

exports.postLogout = function (req, res) {

  req.session = null;
  res.redirect("/");

};

exports.getRegister = function (req, res) {

  if (req.session.user_id) {
    res.redirect("/urls");
  } else {
    res.render("register");
  }

};

exports.postRegister = function (req, res) {

  const {email, pwd} = req.body;
  if (controller.userExists(email)) {
    res.render("register", {userExists: true});
    return;
  }

  if (email === "" || pwd === "") {
    res.render("register", {invalidData: true});
    return;
  }

  req.session.user_id = controller.createNewUser(email, pwd);
  res.redirectLocal();

};

exports.notFound = function (req, res) {
  res.render("not_found");
};