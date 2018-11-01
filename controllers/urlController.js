const db = require("../database/database.js");
const controller = require("./controllerFunctions.js");





exports.getURLs = function (req, res) {
  let templateVars = {
    urls: db.urls,
    user: db.users[req.cookies["username"]]
  };
  res.render("urls_index", templateVars);
};

exports.postURLs = function (req, res) {
  var str = controller.generateRandomString();
  db.urls[str] = req.body.longURL;
  console.log(req.body.longURL + " -> " + str);

  res.redirectLocal(str);
};

exports.getURLsID = function (req, res) {
  let templateVars = {
    shortURL: req.params.id,
    longURL: db.urls[req.params.id],
    user: db.users[req.cookies["username"]]
  };
  res.render("urls_show", templateVars);
};

exports.postURLsID = function (req, res) {

  db.urls[req.params.id] = req.body.newURL;
  res.redirectLocal();

};

exports.delete = function (req, res) {
  delete db.urls[req.params.id];
  res.redirectLocal();
};

exports.new = function (req, res) {
  let templateVars = {
    user: db.users[req.cookies["username"]]
  };
  res.render("urls_new", templateVars);
};

exports.u = function (req, res) {

  const short = req.params.shortURL;

  if (db.urls[short]) {
    res.redirect(db.urls[short]);
  }

};

exports.urlsJSON = function (req, res) {
  res.json(db.urls);
};