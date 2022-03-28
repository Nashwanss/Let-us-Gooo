// lib and imports
const express = require("express");
const app = express();
const port = 3000
const card = require("./controllers/cardController")

// app setup
app.use(express.json())
app.use("/static", express.static("public"));
app.set("view engine", "ejs");


// pages
app.get('/',(req, res) => {
  // callback
  res.render('index.ejs');
});



// Read cards
app.get('/api/getAllCards', (req, res) => {
	card.getCardFromTheSite(req, res)
})


// Launch server :
app.listen(port, () => console.log(`Server Up and running on port ${port}`));