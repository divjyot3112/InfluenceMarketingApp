const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
// var session = require('express-session');
var cookieParser = require("cookie-parser");
const morgan = require("morgan");
// const jwt = require('jsonwebtoken');
const passport = require("passport");
// const config = require('./config/main');

// const users = require('./routes/api/users');
// const tasks = require('./routes/api/tasks');
const WebSocket = require("ws");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const users = require("./routes/api/users");
const tasks = require("./routes/api/tasks");
const influencers = require("./routes/api/influencers");
const sponsors = require("./routes/api/sponsors");
const inbox = require("./routes/api/inbox");
const images = require("./routes/api/users");

// To get POST requests for API use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Log requests to console
app.use(morgan("dev"));

// Initialize passport for use
app.use(passport.initialize());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

// DB Config
const db = require("./config/keys").mongoURI;
const dbconfig = require("./config/keys").mongoCFG;

// Connect to Mongo
mongoose
  .connect(db, dbconfig)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(JSON.stringify(err)));

// Use Routes
app.use("/api/users", users);
app.use("/api/tasks", tasks);
app.use("/api/influencers", influencers);
app.use("/api/sponsors", sponsors);
app.use("/api/inbox", inbox);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("Frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./Frontend", "build", "index.html"));
  });
}

const wss = new WebSocket.Server({ port: 3030 });
wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));
