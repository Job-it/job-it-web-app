import React from 'react';
import TaskCard from './taskCard.jsx';
import interact from 'interactjs';
import { Button } from 'react-bootstrap';

class TaskColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    //USING INTERACT JS FOR DRAG AND DROP
    //SEE '../../lib/interactDnd.js' for reference

    //When a card is successfully dropped in a 'dropzone'
    //Update the db to reflect the new card's position
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
        <div>
            <Button className="plus-btn-circle" bsStyle="success" onClick={() => this.props.openModal(undefined, this.props.stage)}>+</Button>
          <div className="column-title">
            {this.props.stage}
          </div>
          { this.props.tasks.map((task) => {
                    return <TaskCard 
                      taskDetails={task}
                      openModal={this.props.openModal}
                      afterOpenModal={this.props.afterOpenModal}
                      closeModal={this.props.closeModal}
                      archiveTask={this.props.archiveTask}
                      deleteTask={this.props.deleteTask}
                    />
            }) 
          }
        </div>
      </div>
    )
  }
}



export default TaskColumn;