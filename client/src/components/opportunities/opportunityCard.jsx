import React from 'react';
import moment from 'moment';

const OpportunityCard = (props) => {
  return (
  <div 
    id='yes-drop'
    className='opportunity-card draggable drag-drop'
    data-id = {props.opportunity._id}>
    <button onClick={() => props.selectOpportunity(props.opportunity._id)}> Select Opp </button>
    <button onClick = {() => {props.deleteOpp(props.opportunity._id)}}> Delete </button>
    <button onClick = {() => {props.update(props.opportunity._id)}}> Update </button>
    <button onClick = {() => {props.archiveOpportunity(props.opportunity._id)}}> Archive </button>
    <div className="opp-info"><h3>{props.opportunity.oppName}</h3></div>
    <div className="opp-info"><h3>{props.opportunity.orgName}</h3></div>
    <div className="opp-info">Created {moment(props.opportunity.dateOpened).fromNow()}</div>
    <div className="opp-info">{props.opportunity.type}</div>
  </div>
  )
}  

export default OpportunityCard;
