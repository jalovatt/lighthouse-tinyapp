const db = require("../database/database.js");
const bcrypt = require("bcrypt");

exports.generateRandomString = function() {

  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV0123456789";
  const range = chars.length;

  var out = [];
  for (let i = 0; i < 6; i++) {
    const idx = Math.floor(Math.random() * range);
    out.push(chars[idx]);
  }

  return out.join("");
};


exports.getHash = function (pwd) {
  return bcrypt.hashSync(pwd, 10);
};

exports.checkHash = function (pwd, hash) {
  return bcrypt.compareSync(pwd, hash);
};


exports.userExists = function(email) {

  var id = Object.keys(db.users).find( id => db.users[id].email === email );
  return (id) ? db.users[id] : null;

};

exports.validateLogin = function(email, pwd) {

  var user = exports.userExists(email);
  return (user && exports.checkHash(pwd, user.hash)) ? user.id : null;

};

exports.getUserURLs = function(id) {

  let out = {};
  Object.keys(db.urls).forEach( entry => {
    if (db.urls[entry].user === id) {
      out[entry] = db.urls[entry];
    }
  });

  return out;
};

exports.addAnalytics = function(urlID, req) {


};