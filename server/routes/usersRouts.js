const usersController = require('../controllers/usersController.js');
const usersRouter = require('express').Router();

usersRouter.get('/', usersController.get);
usersRouter.post('/', usersController.post);
usersRouter.patch('/', usersController.patch);
usersRouter.delete('/', usersController.delete);

module.exports = usersRouter;