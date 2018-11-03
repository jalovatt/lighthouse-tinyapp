// Helpers for indexController.js

const helpers = require("./controllerFunctions");

const db = require("../database/database.js");
const bcrypt = require("bcrypt");




exports.getHash = function (pwd) {
  return bcrypt.hashSync(pwd, 10);
};


exports.checkHash = function (pwd, hash) {
  return bcrypt.compareSync(pwd, hash);
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


exports.newUserID = function() {

  let id;
  do {
    id = helpers.generateRandomString();
  } while (db.users[id]);
  return id;

};


// Registers a new user in the database and returns their ID
exports.createNewUser = function(email, pwd) {

  const id = exports.newUserID();

  const hash = exports.getHash(pwd);
  db.users[id] = {id, email, hash};

  return id;

};