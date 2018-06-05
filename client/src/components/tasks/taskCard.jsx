import React from 'react';
import moment from 'moment';

const TaskCard = (props) => {
  return (
    <div 
    id='yes-drop' 
    className='task-card draggable-task drag-drop'
    data-id = {props.taskDetails._id}>
      <button onClick={(() => props.openModal(props.taskDetails))}> Edit Task </button>
      <button onClick={() => props.archiveTask(props.taskDetails._id, props.taskDetails.isArchived)}> { props.taskDetails.isArchived ? 'Unarchive' : 'Archive' } </button>
      <div className = "task-info"><h3>{props.taskDetails.content}</h3></div>
      <div className = "task-info">Due {moment(props.taskDetails.dueDate).fromNow()}</div>
      <div className = "task-info">Completed? {props.taskDetails.completion ? 'Yes' : 'No'}</div>
    </div>
  )
}

export default TaskCard;