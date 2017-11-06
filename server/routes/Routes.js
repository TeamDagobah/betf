'use strict'; // ?
module.exports = function(app) {
  var user = require('../controllers/userController.js');
  var game = require('../controllers/gameController.js');
  var algorithms = require('../controllers/algorithmController.js');
  // routes for game:
  app.get('/users', user.getAllUsers)
  app.post('/users', user.addAUser);

  // routes to handle getting and updating specific user. 
  app.get('/users/:username', user.getSpecificUserData)
  app.put('/users/:username', user.updateUser)

  // routes for games:
  app.get('/games', game.getAllGames)
  app.post('/games', game.addAGame);

  app.put('/games/:id', game.updateGame)
  app.delete('/games/:id', game.deleteGame)


  // routes algorithms: 
  app.get('/algos', algorithms.getAllAlgorithms)
  app.post('/algos', algorithms.addAlgorithm);

  app.get('/algos/:id', algorithms.getSpecifiedAlgorithm)
  app.put('/algos/:id', algorithms.updateSubmissionHistoryOfAlgorithm)
  app.delete('/algos/:id', algorithms.deleteAlgorithm)
};