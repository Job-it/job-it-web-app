import React from 'react';
import TaskCard from './taskCard.jsx';

const TaskColumn = (props) => {
  return (
    <div className="statusColumn">
      <div>{props.stage}
        <div>{ props.tasks.map((task) => {return <div><TaskCard taskDetails={task}/><br/></div>}) }</div>
      </div>
    </div>
  )}


export default TaskColumn;