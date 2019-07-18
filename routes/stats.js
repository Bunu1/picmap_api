const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');

const HashtagController = controllers.HashtagController;
const PhotoController = controllers.PhotoController;
const EventController = controllers.EventController;

const statsRouter = express.Router();
statsRouter.use(bodyParser.json());

statsRouter.get('/', function(req, res) {
  let ret = {};

  PhotoController.count()
  .then((count) => {
    ret.photos = count;
    EventController.count()
    .then((count) => {
      ret.events = count;
      HashtagController.findAll(undefined, undefined, undefined, undefined, 50, undefined, true)
      .then((hashtags) => {
        ret.hashtags = hashtags;
        res.status(200).json(ret);
      })
      .catch((err) => {
        res.status(200).end(ret);
      })
    })
    .catch((err) => {
      res.status(200).end(ret);
    })
  })
  .catch((err) => {
    res.status(200).end(ret);
  });
});

module.exports = statsRouter;
