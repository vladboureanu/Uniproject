# Todo List Project using the MERN Stack

### Setup: 
- Open up a terminal.
- `npm install`
- `node app.js` or `npm start`

### Testing out API calls: 
1) If you haven't already, download the `Thunder Client` extension in VSCode.
2) Create `New Request`.
3) Set the method of the request, `GET`, `POST`, `PUT`, `DELETE`, etc.
4) Give the approriate url. The url will be `http://localhost:PORT/ENDPOINT`. The port used by this application is `5000`. Todo and user endpoints are all available in `todo.js` and `user.js` respectively.
5) For the `POST` and `PUT` methods where we are taking information from the client, go to `Body` -> `Form-encoded` and create key/value pairs, for example `task`, `priority`, `due_date` and `labels`.
6) Click on `Send`. If you get a status `200`, it means your request was successful, any other status code means there is an error. `500` will be a server error, `404` may mean that the URL you specified does not exist (maybe a typo).

<hr/>

## UPDATES
- Added `start` script in `package.json` to allow the use of a live server.

- `Completed` task route:
  - In the SQL query, changed `completed = 1` to `completed = NOT completed` to allow toggling between statuses.

- User routes & controllers for login, registration and logoun were created.

## TODO: 
- Set up user sessions.
- Create authentication middleware and use it in all todo routes.
- Create protection middleware for `POST`, `PUT` and `DELETE` methods against unauthorised users. 
  