const RouteManager = function() { };

RouteManager.attach = function(app) {
  app.use('/photo', require('./photo')),
  app.use('/user', require('./user')),
  app.use('/friends', require('./friends'))
};

module.exports = RouteManager;
