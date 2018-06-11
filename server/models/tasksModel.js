var mongoose = require('mongoose');
let taskSchema = require('../../db/index.js').tasksSchema;
let Task = mongoose.model('Task', taskSchema);

let saveTask = (opportunity, taskContent, due, currentStatus, isArchived) => {
  //returns a promise
  return Task.create(
    {
      opportunityFK: opportunity,
      content: taskContent,
      completion: false, 
      dueDate: due,
      status: currentStatus,
      isArchived: isArchived
    }
  );
};

let getTasks = (opportunity, isArchived) => {
  //returns a promise
  return Task.find({opportunityFK: opportunity, isArchived: isArchived});
};

let updateTask = (taskId, taskContent, isComplete, due, currentStatus, isArchived) => {
  //returns a promise
  return Task.update(
    { _id: taskId },
    { $set: {
      content: taskContent,
      completion: isComplete, 
      dueDate: due,
      status: currentStatus,
      isArchived: isArchived
    }
  });
};

let deleteTask = (taskId) => {
  return Task.findByIdAndDelete(taskId);
};

module.exports.saveTask = saveTask;
module.exports.getTasks = getTasks;
module.exports.updateTask = updateTask;
module.exports.deleteTask = deleteTask;
module.exports.Task = Task;