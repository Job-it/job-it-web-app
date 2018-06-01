import React from 'react';
import TaskCard from './taskCard.jsx';

const TaskColumn = (props) => {
  return (
    <div className = {`status-column dropzone ${ props.stage.replace(/\s+/g, '-').toLowerCase() }`}>
      <div>{props.stage}
        <div>{ 
                props.tasks.map((task) => {
                  return <div><TaskCard 
                    taskDetails={task}
                    openModal={props.openModal}
                    afterOpenModal={props.afterOpenModal}
                    closeModal={props.closeModal}
                  /><br/></div>
                }) 
              }</div>
      </div>
    </div>
  )}


export default TaskColumn;