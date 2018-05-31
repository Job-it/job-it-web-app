
var tasksModels = require('../models/tasksModel.js');
var url = require('url');

module.exports = {
  get: (req, res) => {
    var opportunity = req.query.opportunity; //looking for opportunityFK to reference task

    //THESE  VARIABLES ^^^^ CAN CHANGE DEPENDING ON HOW DATA IS BEING PASSED FROM CLIENT------

    tasksModels.getTasks(opportunity)
     .then((data) => {
        res.status(200).send(data); 
     })
     .catch((err) => {
        console.log(err);
     });
 //link this to the model here
  },

  post: (req, res) => {
    var opportunity = req.body.opportunity;
    var taskContent = req.body.taskContent;
    var due = req.body.due;
    var currentStatus = req.body.status; 

    //THESE  VARIABLES ^^^^ CAN CHANGE DEPENDING ON HOW DATA IS BEING PASSED FROM CLIENT------

    tasksModels.saveTask(opportunity, taskContent, due, currentStatus)
    .then((data) => {
      res.send(200, 'Posting Task');
    })
    .catch((err) => {
      console.log(err); 
    })
    //link this to the model here
  },

  patch: (req, res) => {
    var taskId = req.body.taskId;
    var taskContent = req.body.taskContent; 
    var isComplete = req.body.isComplete;
    var due = req.body.due;
    var currentStatus = req.body.currentStatus;

    //THESE  VARIABLES ^^^^ CAN CHANGE DEPENDING ON HOW DATA IS BEING PASSED FROM CLIENT------

    taskModels.updateTask(taskId, taskContent, isComplete, due, currentStatus)
    .then((data) => {
      res.send(200, 'Task patched');
    })
    .catch((err) => {
      console.log(err);
    })
    //link this to the model here
  },

  delete: (req, res) => {
    var taskId = req.body.taskId; 

    //THESE  VARIABLES ^^^^ CAN CHANGE DEPENDING ON HOW DATA IS BEING PASSED FROM CLIENT------

    tasksModel.deleteTask(taskId)
    .then((data) => {
      res.status(204).send('Task Deleting...');
    })
    .catch((err) => {
      console.error(err);
    })
    //link this to the model here
  },
}


