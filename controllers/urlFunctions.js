const db = require("../database/database.js");

exports.getUserURLs = function(id) {

  const out = {};
  Object.keys(db.urls).forEach( entry => {
    if (db.urls[entry].user === id) {
      out[entry] = db.urls[entry];
    }
  });

  return out;

};

exports.addAnalytics = function(urlID, req) {


};