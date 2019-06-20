const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const jwt = require('../utils/jwt.utils');

const PhotoController = controllers.PhotoController;

const photoRouter = express.Router();
photoRouter.use(bodyParser.json());

photoRouter.post('/', /*jwt.checkToken,*/ function(req, res) {
  const description = req.body.description;
  const link = req.body.link;
  const coordinate_x = req.body.coordinate_x;
  const coordinate_y = req.body.coordinate_y;
	
  if(link === undefined) {
    res.status(400).end();
    return;
  }
  if(coordinate_x === undefined) {
    res.status(400).end();
    return;
  }
  if(coordinate_y === undefined) {
    res.status(400).end();
    return;
  }
  
  PhotoController.add(description, link, coordinate_x, coordinate_y)
  .then((p) => {
    res.status(201).json(p);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end({ "error": "Can't add the photo" });
  });
});

photoRouter.get('/', function(req, res) {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const offset = req.query.offset ? parseInt(req.query.offset) : undefined;
  PhotoController.findAll(req.query.id, req.query.description, req.query.link, req.query.coordinate_x, req.query.coordinate_y, limit, offset)
  .then((photos) => {
    res.status(200).json(photos);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  });
});

photoRouter.delete('/:id', /*jwt.checkTokenAdmin,*/ function(req, res) {
  const id = parseInt(req.params.id);
  
  if(id === undefined) {
    req.status(400).end();
  }
  
  PhotoController.remove(id)
  .then((p) => {
    res.status(201).json(p);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  });
})

photoRouter.put('/', /*jwt.checkTokenAdmin,*/ function(req, res) {
    const id = req.body.id;
    const description = req.body.description;
    const link = req.body.link;
    const coordinate_x = req.body.coordinate_x;
    const coordinate_y = req.body.coordinate_y;
  
    if(id === undefined) {
        res.status(400).end();
        return;
    }

    PhotoController.update(id, description, link, coordinate_x, coordinate_y)
    .then((p) => {
        res.status(200).json(p);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).end();
    });
});


module.exports = photoRouter;
