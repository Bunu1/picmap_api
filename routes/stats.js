const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');

const FriendsController = controllers.FriendsController;
const UserController = controllers.UserController;
const PhotoController = controllers.PhotoController;

const statsRouter = express.Router();
statsRouter.use(bodyParser.json());

statsRouter.get('/', function(req, res) {
  PhotoController.count()
  .then((count) => {
    console.log("count = " + count)
    res.status(200).json(photo);
  })
  .catch((err) => {
    res.status(500).end(err);
  })
});

module.exports = statsRouter;
