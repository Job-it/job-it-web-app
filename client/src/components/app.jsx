import React from 'react'
import ReactDOM from 'react-dom'

import OpportunityView from './opportunityView.jsx'
import TaskView from './taskView.jsx'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            taskView: false,
            opportunityView: true
        }
    }

    switchViews() {
        this.setState({
            taskView: this.state.taskView ? false : true,
            opportunityView: this.state.opportunityView ? false : true
        })
    }
    
    render() {
        return (
        <div>
          <button onClick = {() => {this.switchViews()}}>Switch Views</button>
          <div className = "app">
              {this.state.taskView ? <TaskView/> : <div></div>}
              {this.state.opportunityView ? <OpportunityView/> : <div></div>}
          </div>
        </div>
        )
    }
}

export default App;