const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');

const FriendsController = controllers.FriendsController;
const UserController = controllers.UserController;
const PhotoController = controllers.PhotoController;

const statsRouter = express.Router();
statsRouter.use(bodyParser.json());

statsRouter.get('/', /*jwt.checkTokenAdmin,*/ function(req, res) {
  
});
