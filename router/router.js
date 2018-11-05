const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index");
const urlController = require("../controllers/url");
const config = require("../config/config");


// Redirects to a hardcoded local root:
//  http://localhost:/8080/urls/
// The root is concatenated with 'path' if supplied
express.response.redirectLocal = function(path) {

  const redirectURL = config.homeURL + ((path) ? path : "");
  this.redirect(redirectURL);

};


// URL routes
router.get( "/urls",              urlController.get_urls_user);
router.post("/urls",              urlController.post_urls_user);
router.get( "/urls/new",          urlController.get_urls_new);
router.get( "/urls/:id",          urlController.get_url_id);
router.put( "/urls/:id",          urlController.put_url_id);
router.delete("/urls/:id/delete", urlController.delete_url);
router.get( "/u/:shortURL",       urlController.get_url_short);


// User-related and misc. routes
router.get( "/",                  indexController.get_index);
router.get( "/login",             indexController.get_login);
router.post("/login",             indexController.post_login);
router.post("/logout",            indexController.post_logout);
router.get( "/register",          indexController.get_register_user);
router.post("/register",          indexController.post_register_user);
router.get( "/*",                 indexController.not_found);

module.exports = router;