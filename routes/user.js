const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt.utils');

const UserController = controllers.UserController;

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.get('/', /*jwt.checkTokenAdmin,*/ function(req, res) {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const offset = req.query.offset ? parseInt(req.query.offset) : undefined;

  UserController.findAll(req.query.id, req.query.firstname, req.query.lastname, req.query.username, req.query.email, req.query.pp_link, req.query.date_insc, req.query.admin, req.query.active, req.query.enabled)
  .then((users) => {
    res.status(200).json(users);
  })
  .catch((err) => {
    res.status(500).end();
  });
});

userRouter.get('/friendlist/:id', function(req, res) {
    const id = parseInt(req.params.id);

    if(id === undefined) {
        req.status(400).end();
    }

    UserController.getFriendlist(id)
    .then((user) => {
        res.status(200).json(user);
    })
    .catch((err) => {
        res.status(500).end();
    });
});


userRouter.get('/one', function(req, res) {

  let photo = true;
  if(req.query.photos !== undefined) {
      photo = JSON.parse(req.query.photos)
  }

  UserController.findOne(req.query.id, req.query.firstname, req.query.lastname, req.query.username, req.query.email, req.query.pp_link, req.query.date_insc, req.query.admin, req.query.active, req.query.enabled)
  .then((user) => {
      res.status(200).json(user);
  })
  .catch((err) => {
      res.status(500).end();
  });
});

userRouter.post('/login', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if(username === null || password === null) {
    res.status(400).json({ 'error': 'Paramètres invalides' });
  }

  UserController.checkUsername(username)
  .then((user) => {
    if(user.active === 0) {
      res.status(400).json({ 'error': 'Compte désactivé' });
      return;
      }
      bcrypt.compare(password, user.password, function(err, result) {
        if(result) {
            res.status(200).json({
              'id': user.id,
              'firstname': user.firstname,
              'lastname': user.lastname,
              'username': user.username,
              'email': user.email,
              'pp_link': user.pp_link,
              'isAdmin': user.admin,
              'token': jwt.generateToken(user)
            });
        } else {
          res.status(400).json({ 'error': 'Paramètres invalides' });
        }
      });
  })
  .catch((err) => {
    console.log(err)
		res.status(400).end({ 'error': 'Paramètres invalides' });
  });
});

userRouter.put('/', /*jwt.checkTokenAdmin,*/ function(req, res) {
    const id        = req.body.id;
    const firstname  = req.body.firstname;
    const lastname  = req.body.lastname;
    const username  = req.body.username;
    const email     = req.body.email;
    const password  = req.body.password;
    const pp_link  = req.body.pp_link;
    const admin     = req.body.admin;
    const active    = req.body.active;
    const enabled   = req.body.enabled;

    if(req.body.id === undefined) {
        res.status(400).end();
        return;
    }

    UserController.update(id, firstname, lastname, username, email, password, pp_link, admin, active, enabled)
    .then((user) => {
        res.status(201).json(user);
    })
    .catch((err) => {
        res.status(500).end();
    });
});

userRouter.post('/register', function(req, res) {
    const email = req.body.email;
    const firstname  = req.body.firstname;
    const lastname  = req.body.lastname;
    const username  = req.body.username;
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    const pp_link = req.body.pp_link;
    const admin     = req.body.admin;

    if(firstname === undefined || lastname === undefined || email === undefined || password1 === undefined || password2 === undefined || username === undefined) {
        res.status(400).json({ 'error': 'Paramètres invalides' });
    }

    if(password1 !== password2) {
        res.status(500).json({'error': 'Les mots de passes sont différents'});
    } else {
        bcrypt.hash(password1, 5, function(err, bcryptpwd) {
            UserController.createUser(firstname, lastname, username, email, bcryptpwd, pp_link, admin)
            .then((user) => {
                res.status(201).json({'res': 'Succès de la création de l\'utilisateur'});
            })
            .catch((err) => {
                res.status(500).json({'error': 'Échec de la création de l\'utilisateur'});
            })
        });
    }
});

module.exports = userRouter;
