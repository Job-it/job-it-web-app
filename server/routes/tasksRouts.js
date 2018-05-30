const tasksController = require('../controllers/tasksController.js');
const tasksRouter = require('express').Router();

tasksRouter.get('/', tasksController.get);
tasksRouter.post('/', tasksController.post);
tasksRouter.patch('/', tasksController.patch);
tasksRouter.delete('/', tasksController.delete);

module.exports = tasksRouter;