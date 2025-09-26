const express = require("express");
const path = require("path");


const app = express();
// Serve static files (CSS, JS, images) from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/viewmap", (req, res) => {
  res.render("viewmap");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
