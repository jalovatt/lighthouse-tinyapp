// Helpers for indexController.js

const db = require("../database/database.js");
const bcrypt = require("bcrypt");




exports.getHash = function (pwd) {
  return bcrypt.hashSync(pwd, 10);
};


exports.checkHash = function (pwd, hash) {
  return bcrypt.compareSync(pwd, hash);
};


exports.generateRandomString = function() {

  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV0123456789";
  const range = chars.length;

  const out = [];
  for (let i = 0; i < 6; i++) {
    const idx = Math.floor(Math.random() * range);
    out.push(chars[idx]);
  }

  return out.join("");

};


// Returns a user ID if one matching a given email is found
exports.userExists = function(email) {

  const id = Object.keys(db.users).find( id => db.users[id].email === email );
  return (id) ? db.users[id] : null;

};


// Returns a user ID if the login credentials are correct
exports.validateLogin = function(email, pwd) {

  const user = exports.userExists(email);
  return (user && exports.checkHash(pwd, user.hash)) ? user.id : null;

};


// Registers a new user in the database and returns their ID
exports.createNewUser = function(email, pwd) {

  const id = exports.generateRandomString();

  const hash = exports.getHash(pwd);
  db.users[id] = {id, email, hash};

  return id;

};