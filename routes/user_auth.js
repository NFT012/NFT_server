const express = require('express'); 
const router = express.Router();
  
const User = require('../models/Users'); 
const {LoginController} = require('../controllers/user_auth');
const {RegController} = require('../controllers/user_auth');

router.post('/register', RegController); 
router.post('/login', LoginController);
 module.exports = router;