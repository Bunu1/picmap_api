const express = require('express');
const cors = require('cors');
const ModelIndex = require('./models');
const RouteManager = require('./routes');
const expressJWT = require('express-jwt');

ModelIndex
.openDatabase()
.then(_startServer)
.catch((err) => {
  console.error(err);
});

// INTERNAL

function _startServer() {

    const app = express();
    
    app.use(cors());
	app.options('*', cors());
    RouteManager.attach(app);
  
  
      app.listen(8080, function() {
          console.log('Server started on 8080...');
      });
}
