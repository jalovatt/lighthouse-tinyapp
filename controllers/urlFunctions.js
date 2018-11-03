// Helpers for urlController.js

const helpers = require("./controllerFunctions");
const db = require("../database/database.js");


// Returns an array of URL objects belonging to a given user ID
exports.getUserURLs = function(id) {

  const out = {};
  Object.keys(db.urls).forEach( entry => {
    if (db.urls[entry].user === id) {
      out[entry] = db.urls[entry];
    }
  });

  return out;

};


// Update a URL's database entry with this visit
exports.addVisit = function(urlID, req, res) {

  let id;
  if (!req.cookies.tracking) {
    id = ++db.urls[urlID].uniqueVisitors;
    res.cookie("tracking", id);
  } else {
    id = req.cookies.tracking;
  }

  const visit = {
    date: new Date(),
    id
  }

  db.urls[urlID].visits.push(visit);
  console.log(JSON.stringify(db.urls[id], null, 2));

};

exports.newData = function() {
  return {created: new Date(), visits: [], uniqueVisitors: 0};
};


exports.newShortURL = function() {

  let id;
  do {
    id = helpers.generateRandomString();
  } while (db.urls[id]);
  return id

}


exports.addURL = function(url, userID) {

  const id = exports.newShortURL();

  db.urls[id] = {url: url, user: userID, ...exports.newData()};

  console.log(JSON.stringify(db.urls[id], null, 2));
  return id;

}