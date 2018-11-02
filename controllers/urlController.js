const db = require("../database/database.js");
const controller = require("./controllerFunctions.js");




exports.getURLs = function (req, res) {

  let id = req.session.user_id;

  if (!id) {
    res.redirect("/login");
    return;
  }

  let templateVars = {
    urls: controller.getUserURLs(id),
    user: db.users[id]
  };
  res.render("urls_index", templateVars);
};

exports.postURLs = function (req, res) {

  let id = req.session.user_id;

  if (!id) {
    res.redirect("/login");
    return;
  }

  var str = controller.generateRandomString();
  db.urls[str] = {url: req.body.longURL, user: req.session.user_id};
  console.log(req.body.longURL + " -> " + str);

  res.redirectLocal(str);
};

exports.getURLsID = function (req, res) {

  let id = req.session.user_id;

  if (!id) {
    res.redirect("/login");
    return;
  }

  let templateVars = {
    shortURL: req.params.id,
    longURL: db.urls[req.params.id].url,
    user: db.users[id]
  };
  res.render("urls_show", templateVars);
};

exports.postURLsID = function (req, res) {

  let id = req.session.user_id;

  if (!id) {
    res.redirect("/login");
    return;
  }

  db.urls[req.params.id] = req.body.newURL;
  res.redirectLocal();

};

exports.postDelete = function (req, res) {

  let id = req.session.user_id;

  if (!id) {
    res.redirect("/login");
    return;
  }

  delete db.urls[req.params.id];
  res.redirectLocal();
};

exports.getNew = function (req, res) {

  let id = req.session.user_id;

  if (!id) {
    res.redirect("/login");
    return;
  }

  var user = db.users[id];

  if (user) {
    res.render("urls_new", {user});
  } else {
    res.redirect("/login");
  }

};

exports.getShortURL = function (req, res) {

  const short = req.params.shortURL;

  if (db.urls[short]) {
    res.redirect(db.urls[short]);
  }

};