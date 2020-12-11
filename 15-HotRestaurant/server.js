var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data
// ===========================================================
var data = [
  {
  routeName: "eddie",
  name: "Eddie",
  email: "eddieibarra43@gmail.com",
  phone: "555555"
}
];
// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});
app.get("/data", function(req, res) {
  res.json(data);
});
app.get("/api/data", function(req, res) {
    return res.json(data);
  });

  app.get("/api/data/:data", function(req, res) {
    var chosen = req.params.character;
  
    console.log(chosen);
  
    for (var i = 0; i < data.length; i++) {
      if (chosen === data[i].routeName) {
        return res.json(data[i]);
      }
    }
  
    return res.json(false);
  });

  app.post("/api/data", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newData = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newData.routeName = newData.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newData);
  
    data.push(newData);
  
    res.json(newData);
  });
  
  

// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT  http://localhost:" + PORT);
});

