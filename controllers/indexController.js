exports.index = function (req, res) {
  res.send("Hello!");
};

exports.hello = function (req, res) {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
};

exports.login = function (req, res) {
  res.cookie("username", req.body.username);
  res.redirectLocal();
};

exports.logout = function (req, res) {
  res.clearCookie("username");
  res.redirectLocal();
};