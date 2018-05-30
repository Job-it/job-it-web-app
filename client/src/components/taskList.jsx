import React from 'react';

class TaskList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stage: this.props.stage,
      tasks: []
      // {
      //     Id: 1,
      //     Opportunity_FK: 1000,
      //     Content: 'Send in Resume to recruiter',
      //     Done: false,
      //     Due_Date: 'Jan.1st, 2020',
      //     Status: 'Backlog'
      // }
      };
  }

  componentDidMount() {
    this.props.getTasks(this.state.stage);
    // this.setStage({
    //   tasks: [] //the tasks array for that stage
    // });
  }

  render() {
    return (
      <div>
        { this.state.tasks.map((task) => 
        <Task />)}
      </div>
    )
  }

}

export default TaskList;