import React from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';

class TaskCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu() {
    this.setState({ showMenu: true });
    document.addEventListener('click', this.closeMenu);
  }

  closeMenu() {
    this.setState({ showMenu: false });
    document.removeEventListener('click', this.closeMenu);
  }

  render() {
    return (
      <div 
        id='yes-drop'
        className={'task-card ' + (this.props.taskDetails.isArchived ? 'archived' : 'draggable-task drag-drop')}
        data-id = {this.props.taskDetails._id}>
        <div><button className='task-card-menu-button' onClick={() => this.showMenu()}><span>☰</span></button></div>
        <div className='task-card-menu-wrapper'>
          {
            this.state.showMenu
              ? (
                <div className='task-card-menu'>
                  { this.props.taskDetails.isArchived ? <div></div> : <div><Button bsSize="small" bsStyle="success" onClick={() => {this.props.openModal(this.props.taskDetails)}}> Update </Button></div> }
                  <div><Button bsSize="small" bsStyle="warning" onClick={() => {this.props.archiveTask(this.props.taskDetails._id, this.props.taskDetails.isArchived)}}>{ this.props.taskDetails.isArchived ? 'Unarchive' : 'Archive' }</Button></div>
                  <div><Button bsSize="small" bsStyle="danger" onClick={() => {this.props.deleteTask(this.props.taskDetails._id)}}> Delete </Button></div>
                </div>
              )
              : (
                null
              )
            }
        </div>
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