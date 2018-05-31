import React from 'react';

const OpportunityCard = (props) => {
  return (
  <div className="opportunity-card">
    <button onClick={() => props.selectOpportunity(props.opportunity._id)}> Select Opp </button>
    <button onClick = {() => {props.deleteOpp(props.opportunity._id)}}> Delete </button>
    <div className="opp-info">{props.opportunity.orgName}</div>
    <div className="opp-info">{props.opportunity.oppName}</div>
    <div className="opp-info">{props.opportunity.dateOpened}</div>
    <div className="opp-info">{props.opportunity.status}</div>
    <div className="opp-info">{props.opportunity.type}</div>
  </div>
  )
}  

export default OpportunityCard;
