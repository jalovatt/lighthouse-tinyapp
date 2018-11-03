// URL-related routes

const controller = require("./urlFunctions.js");
const db = require("../database/database.js");



// Shows the URLs owned by the current user
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


// Stores a new shortened URL
exports.post_urls_user = function (req, res) {

  const id = req.session.user_id;

  if (!id) {
    res.render("not_allowed");
    return;
  }

  const str = controller.addURL(req.body.longURL, id);

  res.redirectLocal(str);

};


// Allows editing a given URL
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


// Amends an entry with a new URL
exports.put_url_id = function (req, res) {

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


// Deletes a stored URL
exports.delete_url = function (req, res) {

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


// Allows shortening a new URL
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


// Redirects to a shortURL's destination
exports.get_url_short = function (req, res) {

  const short = req.params.shortURL;

  if (!db.urls[short]) {
    res.render("not_found", {user: db.users[req.session.user_id]});
    return;
  }

  controller.addVisit(short, req, res);

  console.log(JSON.stringify(db.urls[short], null, 2));
  res.redirect(db.urls[short].url);

};