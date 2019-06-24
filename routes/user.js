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
    
  UserController.findAll(req.query.id, req.query.username, req.query.email, req.query.date_insc, req.query.admin, req.query.active, req.query.enabled)
  .then((users) => {
    res.status(200).json(users);
  })
  .catch((err) => {
    res.status(500).end();
  });
});

userRouter.get('/one', function(req, res) {
    UserController.findOne(req.query.id, req.query.username, req.query.email, req.query.date_insc, req.query.admin, req.query.active, req.query.enabled)
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
    res.status(400).json({ 'error': 'Invalid parameters' });
  }
  
  UserController.checkUsername(username)
  .then((user) => {
      bcrypt.compare(password, user.password, function(err, result) {
        if(result) {
          if(user.enabled === 1) {
            res.status(200).json({
              'id': user.id,
              'username': user.username,
              'isAdmin': user.admin,
              'token': jwt.generateToken(user)
            });
          } else {
            res.status(403).json({ "error": "Account disabled" })
          }
        } else {
          res.status(400).json({ 'error': 'Invalid identifiers' });
        }
      });
  })
  .catch((err) => {
		res.status(400).json({ 'error': 'Invalid identifiers' });
  });
});

userRouter.put('/', /*jwt.checkTokenAdmin,*/ function(req, res) {
    const id        = req.body.id;
    const username  = req.body.username;
    const email     = req.body.email;
    const password  = req.body.password;
    const admin     = req.body.active;
    const active    = req.body.active;
    const enabled   = req.body.enabled;
    
    if(req.body.id === undefined) {
        res.status(400).end();
        return;
    }


    UserController.update(id, username, email, password, admin, active, enabled)
    .then((user) => {
        res.status(201).json(p);
    })
    .catch((err) => {
        res.status(500).end();
    });
});

userRouter.post('/', function(req, res) {
  const email = req.body.email;
  const password1 = req.body.password1;
  const password2 = req.body.password2;
  const username  = req.body.username;
  const admin     = req.body.admin;
  
  if(email === undefined || password1 === undefined || password2 === undefined || username === undefined) {
    res.status(400).json({ 'error': 'parametres invalides' });
  }
  
  if(password1 !== password2) {
    res.status(500).json({ 'error': 'passwords are different' });
  } else {
    bcrypt.hash(password1, 5, function(err, bcryptpwd) {
      UserController.createUser(username, email, bcryptpwd, admin)
      .then((user) => {
          res.status(201).json({'error': 'User creation succeeded'});
      })
      .catch((err) => {
          UserController
          res.status(500).json({'error': 'User creation failed'});
      })
    });
  }
});

module.exports = userRouter;
