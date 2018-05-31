import React from 'react';

const OpportunityCard = (props) => {
  return (
  <div className="opportunity-card" onClick={() => props.selectOpportunity(props.opportunity._id)}>
    <div className="opp-info">{props.opportunity.orgName}</div>
    <div className="opp-info">{props.opportunity.oppName}</div>
    <div className="opp-info">{props.opportunity.dateOpened}</div>
    <div className="opp-info">{props.opportunity.status}</div>
    <div className="opp-info">{props.opportunity.type}</div>
  </div>
  )
}  

export default OpportunityCard;
