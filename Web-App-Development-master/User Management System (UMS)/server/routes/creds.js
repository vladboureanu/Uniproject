const express = require('express');
const router = express.Router();
const credsController = require('../controllers/credsController');

// render login page
router.get('/login', credsController.login_page);
// handle login
router.post('/login', credsController.login);
// render register page
router.get('/register', credsController.register_page);
// handle register
router.post('/register', credsController.register);
// logout
router.get('/logout', credsController.logout);

module.exports = router;