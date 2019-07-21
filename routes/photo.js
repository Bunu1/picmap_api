const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const jwt = require('../utils/jwt.utils');

const PhotoController = controllers.PhotoController;
const HashtagController = controllers.HashtagController;

const photoRouter = express.Router();
photoRouter.use(bodyParser.json());

photoRouter.get('/', function(req, res) {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const offset = req.query.offset ? parseInt(req.query.offset) : undefined;

  PhotoController.findAll(req.query.id, req.query.description, req.query.link, req.query.coordinate_x, req.query.coordinate_y, req.query.id_user, req.query.id_event, req.query.deleted, limit, offset)
  .then((photos) => {
    res.status(200).json(photos);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  });
});

photoRouter.post('/', /*jwt.checkToken,*/ function(req, res) {
    const description = req.body.description;
    const link = req.body.link;
    const coordinate_x = req.body.coordinate_x;
    const coordinate_y = req.body.coordinate_y;
    const id_user = req.body.id_user;
    const id_event = req.body.id_event;
    const deleted = req.body.deleted;

    if(link === undefined || coordinate_x === undefined || coordinate_y === undefined || id_user === undefined, id_event === undefined) {
      res.status(400).end();
      return;
    }

    PhotoController.add(description, link, coordinate_x, coordinate_y, id_user, id_event, deleted)
    .then((p) => {
      if(p.description) {
        var regex = /#[a-zA-Z]+/g;
        var found = p.description.match(regex);

        if(found) {
          found.forEach((el) => {
            HashtagController.findOne(undefined, el.substring(1), undefined, undefined, undefined, undefined)
            .then((hashtag) => {
              HashtagController.update(hashtag.id, undefined, undefined, hashtag.count + 1)
            })
            .catch((err) => {
              HashtagController.add(el.substring(1), undefined, undefined);
            })
          })
        }
      }

      res.status(201).json(p);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end({ "error": "Can't add the photo" });
    });
});

photoRouter.put('/', /*jwt.checkTokenAdmin,*/ function(req, res) {
    const id = req.body.id;
    const description = req.body.description;
    const link = req.body.link;
    const coordinate_x = req.body.coordinate_x;
    const coordinate_y = req.body.coordinate_y;
    const id_user = req.body.id_user;
    const id_event = req.body.id_event;
    const deleted = req.body.deleted;

    if(id === undefined) {
        res.status(400).end();
        return;
    }

    PhotoController.update(id, description, link, coordinate_x, coordinate_y, id_user, id_event, deleted)
    .then((p) => {
        res.status(200).json({count: p});
    })
    .catch((err) => {
        console.error(err);
        res.status(500).end();
    });
});

photoRouter.put('/remove/:id', function(req, res) {
    const id = req.params.id;

    if(id === undefined) {
        req.status(400).end();
    }

    PhotoController.update(id, undefined, undefined, undefined, undefined, undefined, undefined, 1)
    .then((photo) => {
        res.status(200).json({count: photo});
    })
    .catch((err) => {
        res.status(500).end();
    })
});

photoRouter.delete('/:id', /*jwt.checkTokenAdmin,*/ function(req, res) {
  const id = parseInt(req.params.id);

  if(id === undefined) {
    req.status(400).end();
  }

  PhotoController.delete(id)
  .then((photo) => {
    res.status(201).json(photo);
  })
  .catch((err) => {
    res.status(500).end();
  });
})

module.exports = photoRouter;
