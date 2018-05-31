import React from 'react';

const TaskCard = (props) => {
  return (
    <div className = "task-card">
      <div className = "task-info">Due Date: {props.taskDetails.dueDate}</div>
      <div className = "task-info">Task Complete? {props.taskDetails.completion ? 'Yes' : 'No'}</div>
      <div className = "task-info">Notes: {props.taskDetails.content}</div>
    </div>
  )
}

export default TaskCard;