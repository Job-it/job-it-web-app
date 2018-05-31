var mongoose = require('mongoose');
let taskSchema = require('../../db/index.js').tasksSchema;
let Task = mongoose.model('Task', taskSchema);

let saveTask = (opportunity, taskContent, due, currentStatus) => {
  //returns a promise
  return Task.create(
    {
      opportunityFK: opportunity,
      content: taskContent,
      completion: false, 
      dueDate: due,
      status: currentStatus,
    }
  )
};

let getTasks = (opportunity) => {
  //returns a promise
  return Task.find({opportunityFK: opportunity})
};

let updateTask = (taskId, taskContent, isComplete, due, currentStatus) => {
  //returns a promise
  return Task.update(
    { _id: taskId },
    { $set: {
      content: taskContent,
      completion: isComplete, 
      dueDate: due,
      status: currentStatus,
    }
  })
};

let deleteTask = (taskId) => {
  return Task.findByIdAndDelete(taskId)
};

// saveTask('FOREIGN_KEY', 'task 1', Date.now() - 10, 'In progress');
// saveTask('FOREIGN_KEY', 'task 2', Date.now() - 15, 'Almost done');
// saveTask('FOREIGN_KEY', 'task 3', Date.now() - 5, 'Research Phase');
// saveTask('FOREIGN_KEY', 'task 4', Date.now() - 12, 'Not Started');

// updateTask('5b101ea42a09afa6261d6aeb', 'new content', true, Date.now(), 'COMPLETE').then(() => console.log('updated'));

// deleteTask('5b101ea42a09afa6261d6aeb').then(()=> console.log('deleted'));

// getTasks('FOREIGN_KEY').then((data) => console.log(data));

module.exports.saveTask = saveTask;
module.exports.getTasks = getTasks;
module.exports.updateTask = updateTask;
module.exports.deleteTask = deleteTask;
module.exports.Task = Task;

