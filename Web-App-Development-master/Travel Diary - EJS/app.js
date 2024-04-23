const express = require('express');
const path = require('path');

// Create a new application
const app = express();
const port = 5000 || 3000 || 3030;

// Parsing middleware
app.use(express.json()); // receive, read, and send JSON
app.use(express.urlencoded({extended: false})); // read the request body from the url

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Set up the public folder for static assets
app.use(express.static(path.join(__dirname, 'public')));

// Mount route middlware
const mapRoutes = require('./server/routes/map');
app.use('/', mapRoutes);

// Run the application
app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});