const { DB_URL, PORT, API_V1 } = require("./const/variable");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");
const path = require("path");

var mongoDB = process.env.MONGODB_URI || DB_URL;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors());

//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  var options = {
    root: path.join(__dirname),
  };
  res.sendFile("index.html", options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", "index.html");
    }
  });
});

http.listen(PORT, () => {
  console.log("Server is up and running on port number " + PORT);
});
