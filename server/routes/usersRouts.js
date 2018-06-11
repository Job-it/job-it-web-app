const usersController = require('../controllers/usersController.js');
const usersRouter = require('express').Router();

usersRouter.get('/', usersController.get);
usersRouter.post('/', usersController.post);

module.exports = usersRouter;