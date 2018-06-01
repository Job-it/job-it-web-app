import React from 'react';
import OpportunityCard from './opportunityCard.jsx';
import interact from 'interactjs';

class OpportunityColumn extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        flag: true
      }

    }

    componentDidMount() {
      interact('.dropzone').dropzone({
        
        ondrop: (event) => {
          var id = '';
          var draggableElement = event.relatedTarget;
          var dropzoneElement = event.target;
          //update DB here!!!
          id = draggableElement.dataset.id;
          var targetColumn = dropzoneElement.classList[dropzoneElement.classList.length - 3];
          console.log(id);
          console.log(targetColumn);
          this.props.updateOpportunity(id, targetColumn);
          
          this.forceUpdate();
        }
      });
    }
    render() {
      return (
        <div className = {`status-column dropzone ${this.props.status.replace(/\s+/g, '-').toLowerCase() }`}>
          <div>{this.props.status}
          {this.props.itemsToRender.map((item) => {
            
            return (<OpportunityCard  selectOpportunity= {this.props.selectOpportunity} 
                                      opportunity={item} 
                                      update = {this.props.update}
                                      deleteOpp = {this.props.deleteOpp}
                                      rand = {Math.random()}
                                      archiveOpportunity = {this.props.archiveOpportunity}/>)
          })}
          </div>
        </div>
      );
    }
}

export default OpportunityColumn;