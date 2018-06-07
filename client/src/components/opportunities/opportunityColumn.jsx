import React from 'react';
import OpportunityCard from './opportunityCard.jsx';
import interact from 'interactjs';
import { Button } from 'react-bootstrap';

class OpportunityColumn extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      
      interact('.opportunity-dropzone').dropzone({
        ondrop: (event) => {
          var draggableElement = event.relatedTarget;
          var dropzoneElement = event.target;
          var id = draggableElement.dataset.id;
          var targetColumn = dropzoneElement.classList[dropzoneElement.classList.length - 3];
          this.props.updateOpportunity(id, targetColumn);
        }
      });
    }
    render() {
      return (
        <div className = {`status-column opportunity-dropzone ${this.props.status.replace(/\s+/g, '-').toLowerCase() }`}>
          <div>
            <div>
              {this.props.status}
              <Button className="plus-btn-circle" bsStyle="danger" onClick={() => this.props.openCreateOpportunityModal(this.props.status)}>+</Button>
            </div>
            <br/>
          {this.props.itemsToRender.map((item) => {
            
            return (
              <OpportunityCard  
                selectOpportunity= {this.props.selectOpportunity} 
                opportunity={item} 
                update = {this.props.update}
                deleteOpp = {this.props.deleteOpp}
                archiveOpportunity = {this.props.archiveOpportunity}
              />
            )
          })}
          </div>
        </div>
      );
    }
}

export default OpportunityColumn;