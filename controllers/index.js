// User-related and misc. routes

const userServices = require("../services/user.js");




exports.get_index = function (req, res) {

  if (userServices.validCookie(req)) {
    res.redirect("/urls");
  } else {
    res.redirect("/login");
  }

};


exports.get_login = function (req, res) {

  if (userServices.validCookie(req)) {
    res.redirect("/urls");
  } else {
    res.render("login");
  }

};


exports.post_login = function (req, res) {

  const userID = userServices.validateLogin(req.body.email, req.body.pwd);

  if (!userID) {
    res
      .status(403)
      .render("login", {invalidLogin: true});
    return;
  }

  req.session.user_id = userID;
  res.redirectLocal();

};


exports.post_logout = function (req, res) {

  req.session = null;
  res.redirect("/");

};


exports.get_register_user = function (req, res) {

  if (userServices.validCookie(req)) {
    res.redirect("/urls");
  } else {
    res.render("register");
  }

};


exports.post_register_user = function (req, res) {

  const {email, pwd} = req.body;
  if (userServices.userExists(email)) {
    res
      .status(400)
      .render("register", {userExists: true});
    return;
  }

  if (email === "" || pwd === "") {
    res
      .status(400)
      .render("register", {invalidData: true});
    return;
  }

  req.session.user_id = userServices.createNewUser(email, pwd);
  res.redirectLocal();

};


exports.not_found = function (req, res) {
  res.render("not_found");
};

