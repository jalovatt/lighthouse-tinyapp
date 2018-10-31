const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const urlController = require("../controllers/urlController.js");
const config = require("../config/config");


// Redirects to a hardcoded local root:
//  http://localhost:/8080/urls/
// The root is concatenated with 'path' if supplied
express.response.redirectLocal = function(path) {

  var redirectURL = config.homeURL + ((path) ? path : "");
  this.redirect(redirectURL);

};


router.get( "/",                indexController.index);

router.get( "/urls",            urlController.getURLs);
router.post("/urls",            urlController.postURLs);

router.get( "/urls/:id",        urlController.getURLsID);
router.post("/urls/:id",        urlController.postURLsID);

router.post("/urls/:id/delete", urlController.delete);

router.get( "/urls/new",        urlController.new);

router.get( "/u/:shortURL",     urlController.u);

router.get( "/urls.json",       urlController.urlsJSON);

router.get( "/hello",           indexController.hello);

router.post("/login",           indexController.login);
router.post("/logout",          indexController.logout);


module.exports = router;