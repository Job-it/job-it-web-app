import React from 'react';
import ReactDOM from 'react-dom';
import OpportunityView from './opportunities/opportunityView.jsx';
import TaskView from './tasks/taskView.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        taskView: false,
        opportunityView: true,
        currentOpportunity: null
    };
    this.selectOpportunity = this.selectOpportunity.bind(this);
    this.switchViews = this.switchViews.bind(this);
  }

  selectOpportunity(opportunityId) {
    this.setState({
      currentOpportunity: opportunityId,
      taskView: this.state.taskView ? false : true,
      opportunityView: this.state.opportunityView ? false : true
    });
  }

  switchViews() {
    this.setState({
        taskView: this.state.taskView ? false : true,
        opportunityView: this.state.opportunityView ? false : true
    });
  }
  
  render() {
    return (
    <div>
      {/* <button onClick = {() => {this.switchViews()}}>Switch Views</button> */}
      <div className = "app">
          {this.state.taskView ? <TaskView currentOpportunity={this.state.currentOpportunity} switchViews={this.switchViews}/> : <div></div>}
          {this.state.opportunityView ? <OpportunityView selectOpportunity={this.selectOpportunity} switchViews={this.switchViews}/> : <div></div>}
      </div>
    </div>
    )
  }
}

export default App;