var userController = require('../user/userController.js');
var itemController = require('../item/itemController.js');

//var helpers = require('./helpers.js'); // our custom middleware

module.exports = function (app, express) {
  app.get('/', userController.signin);


  app.post('/api/users/signin', userController.signin);
  app.post('/api/users/signup', userController.signup);


  app.get('/api/store', itemController.getItems);
  app.post('/api/store', itemController.purchaseItem);


  app.get('/api/wallet', userController.getRupees);
  app.get('/api/invetory', itemController.getInvetory);

  /*
  app.get('/:code', linksController.navToLink);

  app.post('/api/users/signin', userController.signin);
  app.post('/api/users/signup', userController.signup);
  app.get('/api/users/signedin', userController.checkAuth);

  // authentication middleware used to decode token and made available on the request
  // app.use('/api/links', helpers.decode);
  app.get('/api/links', linksController.allLinks);
  app.post('/api/links', linksController.newLink);

  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
  */
};

