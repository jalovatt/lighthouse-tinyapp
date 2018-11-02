// Helpers for urlController.js

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
exports.addAnalytics = function(urlID, req) {


};