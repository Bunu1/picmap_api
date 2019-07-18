const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');

const FriendsController = controllers.FriendsController;
const UserController = controllers.UserController;

const friendsRouter = express.Router();
friendsRouter.use(bodyParser.json());

friendsRouter.get('/', /*jwt.checkTokenAdmin,*/ function(req, res) {
  FriendsController.findAll(req.query.id, req.query.id_user, req.query.id_friend, req.query.accepted)
  .then((friends) => {
    res.status(200).json(friends);
  })
  .catch((err) => {
    res.status(500).end();
  });
});

friendsRouter.get('/friendlist', /*jwt.checkTokenAdmin,*/ function(req, res) {
    var id_user = req.query.id_user;

    if(id_user === undefined) {
        res.status(400).json({ 'error': 'parametres invalides' });
    }

    FriendsController.getFriendlist(id_user)
    .then((friends) => {

      if(friends.length === 0)
        res.status(200).json(friends);

      for(let i = 0; i < friends.length; i++) {
        let i2 = i;
        let id = 0;

        if(friends[i2].dataValues.id_user === +id_user) {
          id = friends[i2].dataValues.id_friend;
        } else {
          id = friends[i2].dataValues.id_user;
        }

        UserController.findOne(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)
        .then((user) => {
          friends[i2].dataValues.User = user.dataValues;

          if(i2 === (friends.length - 1)) {
            res.status(200).json(friends);
          }

        })
        .catch((err) => {
          if(i2 === friends.length - 1)
            res.status(500).json(err);
        })
      }
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

friendsRouter.get('/requests', /*jwt.checkTokenAdmin,*/ function(req, res) {
    var id_user = req.query.id_user;

    if(id_user === undefined) {
        res.status(400).json({ 'error': 'parametres invalides' });
    }

    FriendsController.getRequests(id_user)
    .then((friends) => {
        res.status(200).json(friends);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

friendsRouter.get('/status', /*jwt.checkTokenAdmin,*/ function(req, res) {
    var id_user = req.query.id_user;
    var id_friend = req.query.id_friend;

    if(id_user === undefined || id_friend === undefined) {
        res.status(400).json({ 'error': 'parametres invalides' });
    }

    FriendsController.getStatus(id_user, id_friend)
    .then((friends) => {
        res.status(200).json(friends);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

friendsRouter.get('/one', function(req, res) {
    FriendsController.findOne(req.query.id, req.query.id_user, req.query.id_friend, req.query.accepted)
    .then((friend) => {
        res.status(200).json(friend);
    })
    .catch((err) => {
        res.status(500).end();
    });
});


friendsRouter.post('/', function(req, res) {
    const id_user   = req.body.id_user;
    const id_friend = req.body.id_friend;

    if(id_user === undefined || id_friend === undefined) {
        res.status(400).json({ 'error': 'parametres invalides' });
    }

    FriendsController.createFriend(id_user, id_friend)
    .then((friend) => {
        res.status(201).json(friend);
    })
    .catch((err) => {
        res.status(500).end();
    })
});

friendsRouter.put('/', /*jwt.checkTokenAdmin,*/ function(req, res) {
    const id        = req.body.id;
    const id_user   = req.body.id_user;
    const id_friend = req.body.id_friend;
    const accepted  = req.body.accepted;

    if(id === undefined) {
        res.status(400).end();
        return;
    }


    FriendsController.update(id, id_user, id_friend, accepted)
    .then((friends) => {
        res.status(200).json({"count": friends});
    })
    .catch((err) => {
        res.status(500).end();
    });
});

friendsRouter.delete('/:id', /*jwt.checkTokenAdmin,*/ function(req, res) {
  const id = req.params.id;

  if(id === undefined) {
    req.status(400).end();
  }

  FriendsController.remove(id)
  .then((p) => {
    res.status(201).json({itemsDeleted: p});
  })
  .catch((err) => {
    res.status(500).end();
  });
})

module.exports = friendsRouter;
