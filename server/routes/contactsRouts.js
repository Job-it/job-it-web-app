//NOT IN USE
//FOR LATER ADDITION OF A CONTACTS FEATURE
const contactsController = require('../controllers/contactsController.js');
const contactsRouter = require('express').Router();

contactsRouter.get('/', contactsController.get);
contactsRouter.post('/', contactsController.post);
contactsRouter.patch('/', contactsController.patch);
contactsRouter.delete('/', contactsController.delete);

module.exports = contactsRouter;