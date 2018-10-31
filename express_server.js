const express = require("express");
const app = express();
const PORT = 8080;

app.set("view engine", "ejs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};


function generateRandomString() {

  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV0123456789";
  const range = chars.length;

  var out = [];
  for (let i = 0; i < 6; i++) {
    const idx = Math.floor(Math.random() * range);
    out.push(chars[idx]);
  }

  return out.join("");
}



express.response.redirectLocal = function(path) {

  var redirectURL = "http://localhost:8080/urls/" + ((path) ? path : "");
  this.redirect(redirectURL);

}




app.get("/", (req, res) => {
  res.send("Hello!");
});


app.get("/urls", (req, res) => {
  let templateVars = {urls: urlDatabase};
  res.render("urls_index", templateVars);
});

app.post("/urls", (req, res) => {
  var str = generateRandomString();
  urlDatabase[str] = req.body.longURL;
  console.log(req.body.longURL + " -> " + str);

  res.redirectLocal(str);
});


app.get("/urls/:id", (req, res) => {
  let templateVars = {
    shortURL: req.params.id,
    longURL: urlDatabase[req.params.id]
  };
  res.render("urls_show", templateVars);
});

app.post("/urls/:id", (req, res) => {

  urlDatabase[req.params.id] = req.body.newURL;

  res.redirectLocal();
});



app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id];
  res.redirectLocal();
});



app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/u/:shortURL", (req, res) => {

  const short = req.params.shortURL;

  if (urlDatabase[short]) {
    res.redirect(urlDatabase[short]);
  }

});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});





app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});