const db = require("../database/database.js");
const bcrypt = require("bcrypt");

const helpers = require("./common");



const newUserID = function() {

  let id;
  do {
    id = helpers.generateIDString();
  } while (db.users[id]);
  return id;

};


// Returns a user ID if one matching a given email is found
exports.userExists = function(email) {

  const id = Object.keys(db.users).find( id => db.users[id].email === email );
  return (id) ? db.users[id] : null;

};


// Returns the database entry for a given user ID, if it exists
exports.getUserEntry = function(id) {
  return db.users[id];
};


const getHash = function (pwd) {
  return bcrypt.hashSync(pwd, 10);
};


const checkHash = function (pwd, hash) {
  return bcrypt.compareSync(pwd, hash);
};


// Returns a user ID if the given request contains
// a match session cookie
exports.validCookie = function(req) {
  return (db.users[req.session.user_id]) ? req.session.user_id : null;
};


// Returns a user ID if the login credentials are correct
exports.validateLogin = function(email, pwd) {

  const user = exports.userExists(email);
  return (user && checkHash(pwd, user.hash)) ? user.id : null;

};


// Registers a new user in the database and returns their ID
exports.createNewUser = function(email, pwd) {

  const id = newUserID();

  const hash = getHash(pwd);
  db.users[id] = {id, email, hash};

  return id;

};