import React from 'react';
import moment from 'moment';

const TaskCard = (props) => {
  return (
    <div id='yes-drop' className='task-card draggable drag-drop'>
      <button onClick={(() => props.openModal(props.taskDetails))}> Edit Task </button>
      <div className = "task-info"><h3>{props.taskDetails.content}</h3></div>
      <div className = "task-info">Due {moment(props.taskDetails.dueDate).fromNow()}</div>
      <div className = "task-info">Completed? {props.taskDetails.completion ? 'Yes' : 'No'}</div>
    </div>
  )
}

export default TaskCard;