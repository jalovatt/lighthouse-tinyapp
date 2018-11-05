// Helpers for urlController.js

const helpers = require("./common");
const db = require("../database/database.js");


// Returns the database object for a given URL ID, if it exists
exports.getURLEntry = function(id) {
  return db.urls[id];
};



// Returns an array of URL objects belonging to a given user ID
exports.getUserURLs = function(id) {

  const out = {};
  Object.keys(db.urls).forEach( entry => {
    if (db.urls[entry].owner === id) {
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
  };

  db.urls[urlID].visits.push(visit);

};


// Generate a new and unused short URL ID
const newShortURL = function() {

  let id;
  do {
    id = helpers.generateIDString();
  } while (db.urls[id]);
  return id;

};


// Add a new URL to the database
exports.addURL = function(url, userID) {

  const id = newShortURL();

  db.urls[id] = {
    url: url,
    owner: userID,
    created: new Date(),
    visits: [],
    uniqueVisitors: 0
  };

  return id;

};


// Returns a given Date in the form "02 Feb 2018"
exports.formatDate = function(d) {

  return d.toLocaleDateString(
    "en-us",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

};


// Returns a given Date's time in the form "1:49 AM MDT"
// Localization is hardcoded to 'en-us', Mountain time
exports.formatTime = function(d) {

  return d.toLocaleTimeString(
    "en-us",
    {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short"
    });

};

