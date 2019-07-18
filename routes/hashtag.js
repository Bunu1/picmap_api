const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');

const HashtagController = controllers.HashtagController;

const hashtagRouter = express.Router();
hashtagRouter.use(bodyParser.json());

hashtagRouter.get('/', function(req, res) {
  HashtagController.findAll(req.query.id, req.query.hashtag, req.query.first_use, req.query.count, req.query.limit, req.query.offset, req.query.order)
  .then((hashtags) => {
    res.status(200).json(hashtags);
  })
  .catch((err) => {
    res.status(500).end(err);
  })
});

module.exports = hashtagRouter;
