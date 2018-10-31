const db = require("../database/database.js");


function generateRandomString() {

  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV0123456789";
  const range = chars.length;

  var out = [];
  for (let i = 0; i < 6; i++) {
    const idx = Math.floor(Math.random() * range);
    out.push(chars[idx]);
  }

  return out.join("");
}


exports.getURLs = function (req, res) {
  let templateVars = {
    urls: db,
    username: req.cookies["username"]
  };
  res.render("urls_index", templateVars);
};

exports.postURLs = function (req, res) {
  var str = generateRandomString();
  db[str] = req.body.longURL;
  console.log(req.body.longURL + " -> " + str);

  res.redirectLocal(str);
};

exports.getURLsID = function (req, res) {
  let templateVars = {
    shortURL: req.params.id,
    longURL: db[req.params.id],
    username: req.cookies["username"]
  };
  res.render("urls_show", templateVars);
};

exports.postURLsID = function (req, res) {

  db[req.params.id] = req.body.newURL;
  res.redirectLocal();

};

exports.delete = function (req, res) {
  delete db[req.params.id];
  res.redirectLocal();
};

exports.new = function (req, res) {
  let templateVars = {
    username: req.cookies["username"]
  };
  res.render("urls_new", templateVars);
};

exports.u = function (req, res) {

  const short = req.params.shortURL;

  if (db[short]) {
    res.redirect(db[short]);
  }

};

exports.urlsJSON = function (req, res) {
  res.json(db);
};