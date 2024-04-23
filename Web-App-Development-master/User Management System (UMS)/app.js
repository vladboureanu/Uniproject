require('dotenv').config({path: './config/secret.env'});
const express = require('express');
const path = require('path');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const {v4 : uuidv4} = require('uuid'); // import v4 function from uuid package and name it as uuidv4

const port = 5000;
const app = express();

// Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Set up EJS as view engine
app.set('view engine', 'ejs');

// Set up public folder (for images, stylesheets and client-side javascript)
app.use(express.static(path.join(__dirname, 'public')));

// Set up user session middleware
app.use(
    session({
       name: 'sid', 
       genid: (req) => {return uuidv4();},
       secret: process.env.SESSION_KEY,
       resave: false, // regenerates the session on each request
       proxy: true, // allows cookies to pass through proxy servers
       cookie: {
        sameSite: 'strict',
        path: '/',
        httpOnly: false, // httpOnly = false --> frontend JS can see the cookies
        secure: false, // set to true only when using HTTPS
        maxAge: 600000 // maxAge given in ms (600000ms = 10)
       },
       // concurrentDB allows for multiple DB connections simultaneously
       store: new SQLiteStore({ db: 'session.db', concurrentDB: true})
    })
);

// Find routes file
const userRoutes = require('./server/routes/users.js');
const credRoutes = require('./server/routes/creds.js');
// Mount routes to the main endpoint '/'
app.use('/', userRoutes);
app.use('/', credRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
    //console.log('Listening on port ' + port + '.');
});