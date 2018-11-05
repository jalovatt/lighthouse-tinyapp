// URL-related routes

const userServices = require("../services/user");
const urlServices = require("../services/url");
const helpers = require("../services/common");


// Shows the URLs owned by the current user
exports.get_urls_user = function (req, res) {

  const userID = userServices.validCookie(req);

  if (!userID) {
    res
      .status(403)
      .render("not_allowed");
    return;
  }

  const templateVars = {
    urls: urlServices.getUserURLs(userID),
    user: userServices.getUserEntry(userID)
  };
  res.render("urls_index", templateVars);

};


// Stores a new shortened URL
exports.post_urls_user = function (req, res) {

  const userID = userServices.validCookie(req);

  if (!userID) {
    res
      .status(403)
      .render("not_allowed");
    return;
  }

  const str = urlServices.addURL(req.body.longURL, userID);

  res.redirectLocal(str);

};


// Allows editing a given URL and viewing analytics
exports.get_url_id = function (req, res) {

  const userID = userServices.validCookie(req);

  if (!userID) {
    res.redirect("/login");
    return;
  }

  const urlEntry = urlServices.getURLEntry(req.params.id);

  if (!urlEntry) {
    res
      .status(403)
      .render("not_found", {user});
    return;
  }



  if (urlEntry.owner !== userID) {
    res
      .status(403)
      .render("not_yours", {user});
    return;
  }

  const user = userServices.getUserEntry(userID);

  const templateVars = {
    shortURL: req.params.id,
    user,
    urlEntry,
    /*
    url: urlEntry.url,
    owner: urlEntry.owner,
    created: urlEntry.created,
    visits: urlEntry.visits,
    uniqueVisitors: urlEntry.uniqueVisitors,
    */
    fDate: helpers.formatDate,
    fTime: helpers.formatTime
  };
  res.render("urls_show", templateVars);

};


// Amends an entry with a new URL
exports.put_url_id = function (req, res) {

  const userID = userServices.validCookie(req);

  if (!userID) {
    res
      .status(403)
      .render("not_allowed");
    return;
  }

  const urlEntry = urlServices.getURLEntry(req.params.id);

  if (urlEntry.owner !== userID) {
    res
      .status(403)
      .render("not_yours", {user: userServices.getUserEntry(userID)});
    return;
  }

  urlEntry.url = req.body.newURL;
  res.redirectLocal();

};


// Deletes a stored URL
exports.delete_url = function (req, res) {

  const userID = userServices.validCookie(req);

  if (!userID) {
    res
      .status(403)
      .render("not_allowed");
    return;
  }

  const urlID = req.params.id;
  const urlEntry = urlServices.getURLEntry(urlID);

  if (!urlEntry) {
    res
      .status(404)
      .render("not_found", {user: userServices.getUserEntry(userID)});
    return;
  }

  if (urlEntry.owner !== userID) {
    res
      .status(403)
      .render("not_yours", {user: userServices.getUserEntry(userID)});
    return;
  }

  urlServices.deleteURLEntry(urlID);
  res.redirectLocal();

};


// Allows shortening a new URL
exports.get_urls_new = function (req, res) {

  const userID = userServices.validCookie(req);

  if (!userID) {
    res.redirect("/login");
    return;
  }

  const user = userServices.getUserEntry(userID);

  if (user) {
    res.render("urls_new", {user});
  } else {
    res.redirect("/login");
  }

};


// Redirects to a shortURL's destination
exports.get_url_short = function (req, res) {

  const urlID = req.params.shortURL;
  const urlEntry = urlServices.getURLEntry(req.params.shortURL);

  if (!urlEntry) {
    res
      .status(404)
      .render("not_found", {user: userServices.getUserEntry(req.session.user_id)});
    return;
  }

  urlServices.addVisit(urlID, req, res);

  res.redirect(urlEntry.url);

};