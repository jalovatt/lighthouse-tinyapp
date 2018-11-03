// URL-related routes

const controller = require("./urlFunctions.js");
const db = require("../database/database.js");




exports.get_urls_user = function (req, res) {

  const id = req.session.user_id;

  if (!id) {
    res.render("not_allowed");
    return;
  }

  const templateVars = {
    urls: controller.getUserURLs(id),
    user: db.users[id]
  };
  res.render("urls_index", templateVars);

};


exports.post_urls_user = function (req, res) {

  const id = req.session.user_id;

  if (!id) {
    res.render("not_allowed");
    return;
  }

  const str = controller.generateRandomString();
  db.urls[str] = {url: req.body.longURL, user: req.session.user_id};

  res.redirectLocal(str);

};


exports.get_url_id = function (req, res) {

  const id = req.session.user_id;

  if (!id) {
    res.redirect("/login");
    return;
  }

  const shortURL = req.params.id;
  const user = db.users[id];

  if (!db.urls[shortURL]) {
    res.render("not_found", {user});
    return;
  }

  if (db.urls[shortURL].user !== id) {
    res.render("not_yours", {user});
    return;
  }

  const templateVars = {
    shortURL,
    longURL: db.urls[shortURL].url,
    user
  };
  res.render("urls_show", templateVars);

};


exports.post_url_id = function (req, res) {

  const id = req.session.user_id;

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


exports.post_url_delete = function (req, res) {

  const id = req.session.user_id;

  if (!id) {
    res.render("not_allowed");
    return;
  }

  if (db.urls[req.params.id].user !== id) {
    res.render("not_yours", {user: db.users[id]});
    return;
  }

  delete db.urls[req.params.id];
  res.redirectLocal();

};


exports.get_urls_new = function (req, res) {

  const id = req.session.user_id;

  if (!id) {
    res.redirect("/login");
    return;
  }

  const user = db.users[id];

  if (user) {
    res.render("urls_new", {user});
  } else {
    res.redirect("/login");
  }

};


exports.get_url_short = function (req, res) {

  const short = req.params.shortURL;

  if (!db.urls[short]) {
    res.render("not_found", {user: db.users[req.session.user_id]});
    return;
  }

  controller.addAnalytics(short, req);
  res.redirect(db.urls[short].url);

};