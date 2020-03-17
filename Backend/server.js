const express = require('express');
const app = express();  
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('./config/main');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const users = require('./routes/api/users');
const tasks = require('./routes/api/tasks');
const images = require('./routes/api/users');
 
// To get POST requests for API use
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// Log requests to console
app.use(morgan('dev'));

// Initialize passport for use
app.use(passport.initialize()); 

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// DB Config

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://root:root123@cluster0-bcaiq.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true );
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log(err);
//   // perform actions on the collection object
//   client.close();
// });

const db = require('./config/keys').mongoURI;
const dbconfig = require('./config/keys').mongoCFG;

// // Connect to Mongo
mongoose
    .connect(db, dbconfig)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(JSON.stringify(err)));

//Use Routes
app.use('/api/users', users);
app.use('/api/tasks', tasks);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('Frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './Frontend', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));