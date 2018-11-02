const db = require("../database/database.js");
const controller = require("./controllerFunctions.js");




exports.getURLs = function (req, res) {

  let id = req.session.user_id;

  if (!id) {
    res.render("not_allowed");
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
    res.render("not_allowed");
    return;
  }

  var str = controller.generateRandomString();
  db.urls[str] = {url: req.body.longURL, user: req.session.user_id};

  res.redirectLocal(str);
};

exports.getURLsID = function (req, res) {

  let id = req.session.user_id;

  if (!id) {
    res.redirect("/login");
    return;
  }

  let shortURL = req.params.id;

  if (!db.urls[shortURL]) {
    res.render("not_found", {user: db.users[id]});
    return;
  }

  if (db.urls[shortURL].user !== id) {
    res.render("not_yours", {user: db.users[id]});
    return;
  }

  let templateVars = {
    shortURL: shortURL,
    longURL: db.urls[shortURL].url,
    user: db.users[id]
  };
  res.render("urls_show", templateVars);

};

exports.postURLsID = function (req, res) {

  let id = req.session.user_id;

  if (!id) {
    res.render("not_allowed");
    return;
  }

  if (db.urls[req.params.id].user !== id) {
    res.render("not_yours", {user: db.users[id]});
    return;
  }

  db.urls[req.params.id].url = req.body.newURL;
  res.redirectLocal();

};

exports.postDelete = function (req, res) {

  let id = req.session.user_id;

  if (!id) {
    res.redirect("not_allowed");
    return;
  }

  if (db.urls[req.params.id].user !== id) {
    res.render("not_yours", {user: db.users[id]});
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

  if (!db.urls[short]) {
    res.render("not_found", {user: req.session.user_id});
    return;
  }

  controller.addAnalytics(short, req);
  res.redirect(db.urls[short].url);

};