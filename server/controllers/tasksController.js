
var tasksModels = require('../models/tasksModel.js');
var url = require('url');

module.exports = {
  get: (req, res) => {
    var opportunity = req.query.opportunity;
    var isArchived = req.query.isArchived;

    tasksModels.getTasks(opportunity, isArchived)
      .then((data) => {
        res.status(200).send(data); 
      })
      .catch((err) => {
        console.log(err);
      });
  },

  post: (req, res) => {
    var opportunity = req.body.opportunityFK;
    var taskContent = req.body.content;
    var due = req.body.dueDate;
    var currentStatus = req.body.status; 
    var isArchived = req.body.isArchived;

    tasksModels.saveTask(opportunity, taskContent, due, currentStatus, isArchived)
    .then((data) => {
      res.send(200, 'Posting Task');
    })
    .catch((err) => {
      console.log(err); 
    })
    
  },

  patch: (req, res) => {
    var taskId = req.body.taskId;
    var taskContent = req.body.taskContent; 
    var isComplete = req.body.isComplete;
    var due = req.body.due;
    var currentStatus = req.body.currentStatus;
    var isArchived = req.body.isArchived;

    //THESE  VARIABLES ^^^^ CAN CHANGE DEPENDING ON HOW DATA IS BEING PASSED FROM CLIENT------

    tasksModels.updateTask(taskId, taskContent, isComplete, due, currentStatus, isArchived)
    .then((data) => {
      res.send(200, 'Task patched');
    })
    .catch((err) => {
      console.log(err);
    })
    //link this to the model here
  },

  delete: (req, res) => {
    var taskId = req.query._id; 

    //THESE  VARIABLES ^^^^ CAN CHANGE DEPENDING ON HOW DATA IS BEING PASSED FROM CLIENT------

    tasksModels.deleteTask(taskId)
    .then((data) => {
      res.status(204).send('Task Deleting...');
    })
    .catch((err) => {
      console.error(err);
    });
    //link this to the model here
  },
};


