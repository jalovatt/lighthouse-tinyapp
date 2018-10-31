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

  var redirectURL = "http://localhost:8080/urls/" + str;
  res.redirect(redirectURL);
});


app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id];
  var redirectURL = "http://localhost:8080/urls/";
  res.redirect(redirectURL);
});



app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/u/:shortURL", (req, res) => {

  const short = req.params.shortURL;

  if (urlDatabase[short]) {
    console.log("redirecting " + short + " -> " + urlDatabase[short]);
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