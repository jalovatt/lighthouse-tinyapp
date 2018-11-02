const db = require("../database/database.js");

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

exports.userExists = function(email) {

  var id = Object.keys(db.users).find( id => db.users[id].email === email );
  return (id) ? db.users[id] : null;

};

exports.validateLogin = function(email, pwd) {

  var user = exports.userExists(email);
  return (user && user.pwd === pwd) ? user.id : null;

};