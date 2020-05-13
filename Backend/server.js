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
const cron = require("node-cron");
const shell = require("shelljs");

const Task = require("./models/Task");
const taskStatus = require("./utils/Constants").TaskStatus;

app.use(cors({ origin: "*" }));

const users = require("./routes/api/users");
const tasks = require("./routes/api/tasks");
const influencers = require("./routes/api/influencers");
const sponsors = require("./routes/api/sponsors");
const inbox = require("./routes/api/inbox");
const recommendations = require("./routes/api/recommendations");

const images = require("./routes/api/users");

// To get POST requests for API use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Log requests to console
app.use(morgan("dev"));

// Initialize passport for use
app.use(passport.initialize());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
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
app.use("/api/recommendations", recommendations);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("Frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./Frontend", "build", "index.html"));
  });
}

// cron job will run at 1:00 AM every day
cron.schedule("0 1 * * *", function () {
  console.log("running cron job at 1:00 AM every day");

  // mark task as In Progress if task is Pending and start date has passed
  Task.updateMany(
    {
      isActive: true,
      status: taskStatus.PENDING,
      startDate: { $lt: new Date() },
    },
    {
      $set: {
        status: taskStatus.INPROGRESS,
      },
    },
    function (err, result) {
      if (err) {
        console.log("Error in marking tasks as In Progress by Cron Job");
      } else {
        console.log(
          "Number of tasks marked In Progress by Cron Job: " + result.nModified
        );
      }
    }
  );

  // mark task as Completed if task is In Progress and end date has passed
  Task.updateMany(
    {
      isActive: true,
      status: taskStatus.INPROGRESS,
      endDate: { $lt: new Date() },
    },
    {
      $set: {
        status: taskStatus.COMPLETED,
      },
    },
    function (err, result) {
      if (err) {
        console.log("Error in marking tasks as Completed by Cron Job");
      } else {
        console.log(
          "Number of tasks marked Completed by Cron Job: " + result.nModified
        );
      }
    }
  );

  // mark task as Cancelled if number of selected candidates is less than vacancy count
  // and start date has passed
  Task.updateMany(
    {
      isActive: true,
      status: taskStatus.CREATED,
      startDate: { $lt: new Date() },
      $expr: { $ne: [{ $size: "$selectedCandidates" }, "$vacancyCount"] },
    },
    {
      $set: {
        status: taskStatus.CANCELLED,
        isActive: false,
      },
    },
    function (err, result) {
      if (err) {
        console.log("Error in marking tasks as Cancelled by Cron Job");
      } else {
        console.log(
          "Number of tasks marked Cancelled by Cron Job: " + result.nModified
        );
      }
    }
  );

  console.log("--------------------------------------------------");
  console.log("Generating Recommendations");
  if (
    shell.exec("python recommendation_script/recommendations.py").code !== 0
  ) {
    shell.exit(1);
  } else {
    shell.echo("Generation of Recommendations Complete");
  }
});

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
