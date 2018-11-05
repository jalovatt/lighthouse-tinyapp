const db = require("../database/database.js");
const helpers = require("./common");



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


exports.deleteURLEntry = function(entry) {
  delete db.urls[entry];
};