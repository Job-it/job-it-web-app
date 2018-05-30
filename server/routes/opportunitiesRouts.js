const opportunitiesController = require('../controllers/opportunitiesController.js');
const opportunitiesRouter = require('express').Router();

opportunitiesRouter.get('/', opportunitiesController.get);
opportunitiesRouter.post('/', opportunitiesController.post);
opportunitiesRouter.patch('/', opportunitiesController.patch);
opportunitiesRouter.delete('/', opportunitiesController.delete);

module.exports = opportunitiesRouter;