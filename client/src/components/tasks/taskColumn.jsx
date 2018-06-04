import React from 'react';
import TaskCard from './taskCard.jsx';
import interact from 'interactjs';

class TaskColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      
    interact('.task-dropzone').dropzone({
      ondrop: (event) => {
        var draggableElement = event.relatedTarget;
        var dropzoneElement = event.target;
        var id = draggableElement.dataset.id;
        var targetColumn = dropzoneElement.classList[dropzoneElement.classList.length - 3];
        this.props.updateTask(id, targetColumn);
      }
    });
  }

  render() {
    return (
      <div className = {`status-column task-dropzone ${ this.props.stage.replace(/\s+/g, '-').toLowerCase() }`}>
        <div>{this.props.stage}
          <div>{ 
                  this.props.tasks.map((task) => {
                    return <div><TaskCard 
                      taskDetails={task}
                      openModal={this.props.openModal}
                      afterOpenModal={this.props.afterOpenModal}
                      closeModal={this.props.closeModal}
                    /><br/></div>
                  }) 
                }</div>
        </div>
      </div>
    )
  }
}



export default TaskColumn;