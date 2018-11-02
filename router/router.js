const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const urlController = require("../controllers/urlController.js");
const config = require("../config/config");


// Redirects to a hardcoded local root:
//  http://localhost:/8080/urls/
// The root is concatenated with 'path' if supplied
express.response.redirectLocal = function(path) {

  const redirectURL = config.homeURL + ((path) ? path : "");
  this.redirect(redirectURL);

};


router.get( "/",                indexController.getIndex);

router.get( "/login",           indexController.getLogin);
router.post("/login",           indexController.postLogin);
router.post("/logout",          indexController.postLogout);

router.get( "/register",        indexController.getRegister);
router.post("/register",        indexController.postRegister);

router.get( "/urls",            urlController.getURLs);
router.post("/urls",            urlController.postURLs);

router.get( "/urls/new",        urlController.getNew);

router.get( "/urls/:id",        urlController.getURLsID);
router.post("/urls/:id",        urlController.postURLsID);

router.post("/urls/:id/delete", urlController.postDelete);

router.get( "/u/:shortURL",     urlController.getShortURL);

router.get( "/*",               indexController.notFound);

module.exports = router;