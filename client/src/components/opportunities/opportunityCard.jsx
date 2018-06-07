import React from 'react';
import moment from 'moment';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class OpportunityCard extends React.Component {
  constructor(props) {
    //console.log(props);
    super(props);
  }

  render() {
    return (
      <div 
        id='yes-drop'
        className={'opportunity-card ' + (this.props.opportunity.isArchived ? 'archived' : 'draggable-opportunity drag-drop')}
        data-id = {this.props.opportunity._id}
      >
        <DropdownButton
          bsStyle="default"
          title="☰"
          noCaret
          id="dropdown-no-caret"
          className='opportunity-card-menu-button'
        >
          { this.props.opportunity.isArchived ? null : <MenuItem  onClick={() => this.props.selectOpportunity(this.props.opportunity._id, this.props.opportunity.oppName, this.props.opportunity.orgName) }>Explore</MenuItem> }
          { this.props.opportunity.isArchived ? null : <MenuItem  onClick = {() => {this.props.update(this.props.opportunity._id)}}> Update </MenuItem> }
          <MenuItem onClick = {() => {this.props.archiveOpportunity(this.props.opportunity._id, this.props.opportunity.isArchived)}}>{ this.props.opportunity.isArchived ? 'Unarchive' : 'Archive' }</MenuItem>
          <MenuItem onClick = {() => {this.props.deleteOpp(this.props.opportunity._id)}}> Delete </MenuItem>
        </DropdownButton>
        <div className='opportunity-content-main'>
        <div className="opp-info"><h3>{this.props.opportunity.oppName}</h3></div>
        <div className="opp-info"><h3>{this.props.opportunity.orgName}</h3></div>
        <div className="opp-info">Created {moment(this.props.opportunity.dateOpened).fromNow()}</div>
        <div className="opp-info">Due {moment(this.props.opportunity.dateClosed).fromNow()}</div>
        <div className="opp-info">{this.props.opportunity.type}</div>
        </div>
      </div>
    )
  } 
} 

export default OpportunityCard;
