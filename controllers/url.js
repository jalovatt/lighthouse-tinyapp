// URL-related routes

const userServices = require("../services/user");
const urlServices = require("../services/url");
const db = require("../database/database");



// Shows the URLs owned by the current user
exports.get_urls_user = function (req, res) {

  const id = userServices.validCookie(req);

  if (!id) {
    res
      .status(403)
      .render("not_allowed");
    return;
  }

  const templateVars = {
    urls: urlServices.getUserURLs(id),
    user: userServices.getUserEntry(id)
  };
  res.render("urls_index", templateVars);

};


// Stores a new shortened URL
exports.post_urls_user = function (req, res) {

  const id = userServices.validCookie(req);

  if (!id) {
    res
      .status(403)
      .render("not_allowed");
    return;
  }

  const str = urlServices.addURL(req.body.longURL, id);

  res.redirectLocal(str);

};


// Allows editing a given URL and viewing analytics
exports.get_url_id = function (req, res) {

  const id = userServices.validCookie(req);

  if (!id) {
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



  if (urlEntry.owner !== id) {
    res
      .status(403)
      .render("not_yours", {user});
    return;
  }

  const user = userServices.getUserEntry(id);

  const templateVars = {
    shortURL: req.params.id,
    user,
    url: urlEntry.url,
    owner: urlEntry.owner,
    created: urlEntry.created,
    visits: urlEntry.visits,
    uniqueVisitors: urlEntry.uniqueVisitors,
    fDate: urlServices.formatDate,
    fTime: urlServices.formatTime
  };
  res.render("urls_show", templateVars);

};


// Amends an entry with a new URL
exports.put_url_id = function (req, res) {

  const id = userServices.validCookie(req);

  if (!id) {
    res
      .status(403)
      .render("not_allowed");
    return;
  }

  const urlEntry = urlServices.getURLEntry(req.params.id);

  if (urlEntry.owner !== id) {
    res
      .status(403)
      .render("not_yours", {user: userServices.getUserEntry(id)});
    return;
  }

  urlEntry.url = req.body.newURL;
  res.redirectLocal();

};


// Deletes a stored URL
exports.delete_url = function (req, res) {

  const id = userServices.validCookie(req);

  if (!id) {
    res
      .status(403)
      .render("not_allowed");
    return;
  }

  const urlEntry = urlServices.getURLEntry(req.params.id);

  if (!urlEntry) {
    res
      .status(404)
      .render("not_found", {user: userServices.getUserEntry(id)});
    return;
  }

  if (urlEntry.owner !== id) {
    res
      .status(403)
      .render("not_yours", {user: userServices.getUserEntry(id)});
    return;
  }

  delete db.urls[req.params.id];
  res.redirectLocal();

};


// Allows shortening a new URL
exports.get_urls_new = function (req, res) {

  const id = userServices.validCookie(req);

  if (!id) {
    res.redirect("/login");
    return;
  }

  const user = userServices.getUserEntry(id);

  if (user) {
    res.render("urls_new", {user});
  } else {
    res.redirect("/login");
  }

};


// Redirects to a shortURL's destination
exports.get_url_short = function (req, res) {

  const short = req.params.shortURL;

  if (!db.urls[short]) {
    res
      .status(404)
      .render("not_found", {user: userServices.getUserEntry(req.session.user_id)});
    return;
  }

  urlServices.addVisit(short, req, res);

  res.redirect(db.urls[short].url);

};