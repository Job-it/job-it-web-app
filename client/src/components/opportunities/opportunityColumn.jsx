import React from 'react';
import OpportunityCard from './opportunityCard.jsx';
import interact from 'interactjs';
import { Button } from 'react-bootstrap';

class OpportunityColumn extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      
      //USING INTERACT JS FOR DRAG AND DROP
      //SEE '../../lib/interactDnd.js' for reference

      //When a card is successfully dropped in a 'dropzone'
      //Update the db to reflect the new card's position
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
          <Button className="plus-btn-circle" bsStyle="success" onClick={() => this.props.openCreateOpportunityModal(this.props.status)}>+</Button>
            <div className = 'column-title'>
              {this.props.status}
            </div>
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