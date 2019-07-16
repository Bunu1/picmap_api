const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');

const EventController = controllers.EventController;

const eventRouter = express.Router();
eventRouter.use(bodyParser.json());

eventRouter.get('/', /*jwt.checkTokenAdmin,*/ function(req, res) {

  let photo = false;
  if(req.query.photos !== undefined) {
      photo = JSON.parse(req.query.photos)
  }

  EventController.findAll(req.query.id, req.query.name, req.query.start_date, req.query.end_date, req.query.coordinate_x, req.query.coordinate_y, req.query.range, photo)
  .then((events) => {
      res.status(200).json(events);
  })
  .catch((err) => {
      res.status(500).end();
  });
});

eventRouter.get('/actual', /*jwt.checkTokenAdmin,*/ function(req, res) {

  let photo = false;
  if(req.query.photos !== undefined) {
      photo = JSON.parse(req.query.photos)
  }

  EventController.findActuals(req.query.id, req.query.name, req.query.start_date, req.query.end_date, req.query.coordinate_x, req.query.coordinate_y, req.query.range, photo)
  .then((events) => {
      res.status(200).json(events);
  })
  .catch((err) => {
      res.status(500).end();
  });
});

eventRouter.get('/one', /*jwt.checkTokenAdmin,*/ function(req, res) {
    EventController.findOne(req.query.id, req.query.name, req.query.start_date, req.query.end_date, req.query.coordinate_x, req.query.coordinate_y, req.query.range)
    .then((event) => {
        res.status(200).json(event);
    })
    .catch((err) => {
        res.status(500).end();
    });
});

eventRouter.post('/', function(req, res) {
    const name          = req.body.name;
    const start_date    = req.body.start_date;
    const end_date      = req.body.end_date;
    const coordinate_x  = req.body.coordinate_x;
    const coordinate_y  = req.body.coordinate_y;
    const range         = req.body.range;

    EventController.createEvent(name, start_date, end_date, coordinate_x, coordinate_y, range)
    .then((event) => {
        res.status(201).json(event);
    })
    .catch((err) => {
        res.status(500).end();
    })
});

eventRouter.put('/', /*jwt.checkTokenAdmin,*/ function(req, res) {
    const id            = req.body.id;
    const name          = req.body.name;
    const start_date    = req.body.start_date;
    const end_date      = req.body.end_date;
    const coordinate_x  = req.body.coordinate_x;
    const coordinate_y  = req.body.coordinate_y;
    const range         = req.body.range;


    if(id === undefined) {
        res.status(500).end();
        return;
    }

    EventController.update(id, name, start_date, end_date, coordinate_x, coordinate_y, range)
    .then((events) => {
        res.status(200).json({"count": events});
    })
    .catch((err) => {
        res.status(500).end();
    });
});

eventRouter.delete('/:id', /*jwt.checkTokenAdmin,*/ function(req, res) {
  const id = req.params.id;

  if(id === undefined) {
    req.status(500).end();
  }

  EventController.remove(id)
  .then((p) => {
    res.status(200).json({itemsDeleted: p});
  })
  .catch((err) => {
    res.status(500).end();
  });
})

module.exports = eventRouter;
