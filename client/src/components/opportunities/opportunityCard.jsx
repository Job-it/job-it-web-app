import React from 'react';
import moment from 'moment';

const OpportunityCard = (props) => {
  console.log('opportunity card', moment(props.opportunity.dateOpened).fromNow());
  return (
  <div className="opportunity-card">
    <button onClick={() => props.selectOpportunity(props.opportunity._id)}> Select Opp </button>
    <button onClick = {() => {props.deleteOpp(props.opportunity._id)}}> Delete </button>
    <button onClick = {() => {props.update(props.opportunity._id)}}> Update </button>
    <div className="opp-info"><h3>{props.opportunity.oppName}</h3></div>
    <div className="opp-info"><h3>{props.opportunity.orgName}</h3></div>
    <div className="opp-info">Created {moment(props.opportunity.dateOpened).fromNow()}</div>
    <div className="opp-info">{props.opportunity.type}</div>
  </div>
  )
}  

export default OpportunityCard;
