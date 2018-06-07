import React from 'react';
import moment from 'moment';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class TaskCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div 
        id='yes-drop'
        className={'task-card ' + (this.props.taskDetails.isArchived ? 'archived' : 'draggable-task drag-drop')}
        data-id = {this.props.taskDetails._id}>
        <DropdownButton
          bsStyle="default"
          title="☰"
          noCaret
          id="dropdown-no-caret"
          className='opportunity-card-menu-button'
        >
          { this.props.taskDetails.isArchived ? null: <MenuItem bsSize="small" bsStyle="success" onClick={() => {this.props.openModal(this.props.taskDetails)}}> Update </MenuItem>}
          <MenuItem  onClick={() => {this.props.archiveTask(this.props.taskDetails._id, this.props.taskDetails.isArchived)}}>{ this.props.taskDetails.isArchived ? 'Unarchive' : 'Archive' }</MenuItem>
          <MenuItem  onClick={() => {this.props.deleteTask(this.props.taskDetails._id)}}> Delete </MenuItem>
        </DropdownButton>
        <div className = "task-content-main">
        <div className = "task-info"><h3>{this.props.taskDetails.content}</h3></div>
        <div className = "task-info">Due {moment(this.props.taskDetails.dueDate).fromNow()}</div>
        <div className = "task-info">Completed? {this.props.taskDetails.completion ? 'Yes' : 'No'}</div>
        </div>
      </div>
    )
  }
}

export default TaskCard;