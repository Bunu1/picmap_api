const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');

const FriendsController = controllers.FriendsController;

const friendsRouter = express.Router();
friendsRouter.use(bodyParser.json());

friendsRouter.get('/', /*jwt.checkTokenAdmin,*/ function(req, res) {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const offset = req.query.offset ? parseInt(req.query.offset) : undefined;
    
  FriendsController.findAll(req.query.id, req.query.id_user, req.id_friend)
  .then((friends) => {
    res.status(200).json(friends);
  })
  .catch((err) => {
    res.status(500).end();
  });
});

friendsRouter.put('/', /*jwt.checkTokenAdmin,*/ function(req, res) {
    const id        = req.id;
    const id_user   = req.id_user;
    const id_friend = req.id_friend;
    
    if(req.body.id_user === undefined) {
        res.status(400).end();
        return;
    }


    FriendsController.update(id, id_user, id_friend)
    .then((friends) => {
        res.status(201).json(p);
    })
    .catch((err) => {
        res.status(500).end();
    });
});

friendsRouter.post('/', function(req, res) {
    const email = req.body.email;
    const id_user   = req.id_user;
    const id_friend = req.id_friend;

    if(id_user === undefined || id_friend === undefined) {
        res.status(400).json({ 'error': 'parametres invalides' });
    }

    FriendsController.createFriend(id_user, id_friend)
    .then((friend) => {
        res.status(201).json(p);
    })
    .catch((err) => {
        res.status(500).end();
    })
});

module.exports = friendsRouter;
