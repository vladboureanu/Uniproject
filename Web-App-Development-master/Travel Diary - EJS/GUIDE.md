# Creating a Node web application

### Setting up the project's server
- Create a new project: `npm -y init`
- Create the main file (entry point of application) for our backend f.e. `app.js`
- Modify the `main` property in `package.json` to be the same as my main file f.e. `index.js` --> `app.js`
- Install `nodemon`: `npm install nodemon` OR `npm install --save-dev nodemon`
- In `package.json` create a new `start` script --> `"start" : "nodemon <main_file.js>"`
- (Optional) Create a `.gitignore` file in the root of the project
- (Optional) In `.gitignore` add:
  - `node_modules/`
  - `package-lock.json`
  - `.env`

<hr>

### Creating the application's server structure
- In the root folder create the following folders:
  - `server` --> folders `controllers` and `routes`
  - `middleware` : for custom middleware
  - `config` : for the database and `.env` files
- If using `EJS` for rendering pages, create also the following folders in the root:
  - `views` --> folder `partials` if creating partial `HTML`
  - `public` --> folders `images`, `scripts` (for frontend JS), `styles` 

<hr>

### Editing the main server file (f.e. app.js)
- Install the `express` package, within the terminal: `npm install express`
- In the main server file (`app.js`), we need to import the `express` package and create a new application.
- Define configuration settings for the application:
  - App can receive and read JSON (parsing middleware)
  - App can read the request body from the received url (parsing middleware)
  - EJS as the view engine, and the public folder (the `path` package needs to be installed: `npm install path`)
  - Define any other necessary middleware (f.e. sessions)

<hr>

### Creating the routes and controllers
The routes and controllers are dependent on the contect of the project itself.
The project can have multiple route & controller files, typically divided based on their functionality (f.e. generating main website features, handling users, etc).

- Within the `server/routes` folder, create a new file f.e. `map.js`.
- Within the `server/controllers` folder, create a new file f.e. `mapController.js`.

For the routes file (`map.js`):
- Import the `express` package and create a `router`
- Import the controller file
- Define all available routes with their endpoint and controller function

For the controllers file (`mapController.js`):
- Define the controller functions, same as the ones in the routes file, and export them immediately.
- Use a `try-catch` syntax, to execute the controller function and catch general server errors.


After creating the routes, they need to be imported within the main server file (`app.js`):
- Import the routes
- Define the route middleware
<hr>

### Create the views files:
- Install the `ejs` package, in the terminal: `npm install ejs`
- Within the `views` folder, create as many `.ejs` files as necessary, to be generated from the routes (f.e. `main.ejs`, `500.ejs`, `404.ejs`)

<hr>

### Create the database file: 
- Within the `config` folder, create a `database.js` file.
- If using `Sqlite3`:
  - Install the `sqlite3` package, in the terminal: `npm install sqlite3`
  - Import the package within the `database.js` file
  - Create a new database: `const db = new sqlite3.Database("db_name")`, where `db_name` is the name of the database.
  - Use the `.serialize()` method to create the necessary tables and initial data. This is important because the `sqlite3` package can handle multiple simultaneous requests, and the `serialize()` method ensures that all necessary actions have been performed before interacting with the database. 
  - Export the connection, f.e. `module.exports = db`.
<hr>

### Running the server: 
- In the terminal: `npm start` to run a live server