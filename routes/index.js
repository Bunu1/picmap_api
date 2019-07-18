const RouteManager = function() { };

RouteManager.attach = function(app) {
  app.use('/photo', require('./photo')),
  app.use('/user', require('./user')),
  app.use('/friends', require('./friends')),
  app.use('/event', require('./event')),
  app.user('/stats', require('./stats'))
};

module.exports = RouteManager;
