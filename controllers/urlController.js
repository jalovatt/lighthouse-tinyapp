const db = require("../database/database.js");
const controller = require("./controllerFunctions.js");




exports.getURLs = function (req, res) {

  let id = req.session.user_id;
  let templateVars = {
    urls: controller.getUserURLs(id),
    user: db.users[id]
  };
  res.render("urls_index", templateVars);
};

exports.postURLs = function (req, res) {
  var str = controller.generateRandomString();
  db.urls[str] = {url: req.body.longURL, user: req.session.user_id};
  console.log(req.body.longURL + " -> " + str);

  res.redirectLocal(str);
};

exports.getURLsID = function (req, res) {
  let id = req.session.user_id;

  if (db.urls[req.params.id].user !== id) {
    res.render("not_allowed", {user: db.users[id]});
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

  db.urls[req.params.id] = req.body.newURL;
  res.redirectLocal();

};

exports.postDelete = function (req, res) {

  let id = req.params.id;

  if (db.urls[id].user !== id) {
    res.redirect("/");
    return;
  }

  delete db.urls[req.params.id];
  res.redirectLocal();
};

exports.getNew = function (req, res) {
  var user = db.users[req.session.user_id];

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

exports.getURLsJSON = function (req, res) {
  res.json(db.urls);
};