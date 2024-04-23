require('dotenv').config({path: './config/secret.env'});
const express = require('express');
const fileup = require('express-fileupload');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const {v4 : uuidv4} = require('uuid'); // import v4 function from uuid and name it uuidv4
const db = require('./config/database'); // require the database connection file (.js)

const app = express();
const port = 5000;

// Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// File upload Middleware
app.use(fileup());

// Configuring session middleware
app.use(
    session({
      name: 'sid',
      secret: process.env.SESSION_KEY, 
      resave: false, // regenerate session on each request to keep in active
      saveUninitialized: false, 
      rolling: false, // sid cookie set on every response, resets expiration countdown
      unset: 'destroy', 
      proxy: true, // allow session cookies to pass through proxy servers -- for production
      genid: (req) => { return uuidv4(); },
      cookie: {
        sameSite: 'strict',
        path: '/',
        maxAge: 600000, // in ms
        httpOnly: false, // allow client-side code to access the session cookies, compliant clients will not allow client-side Javascript to see the cookie in document.cookie 
        secure: false // set true only when using HTTPS
      },
      store: new SQLiteStore({db: 'session.db', concurrentDB: true}) // concurrentDB allows for multiple DB connections to be created simultaneously
    })
);
  

// Mount Routes
const todoRoutes = require('./server/routes/todo');
const userRoutes = require('./server/routes/user');
app.use('/', todoRoutes);
app.use('/', userRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

