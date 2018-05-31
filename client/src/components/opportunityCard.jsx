import React from 'react';

const OpportunityCard = (props) => {
  return (
  <div className="opportunity-card" onClick={() => props.selectOpportunity(props.opportunity.id)}>
    <div className="opp-info">{props.opportunity.Opportunity_Name}</div>
    <div className="opp-info">{props.opportunity.Organization_Name}</div>
    <div className="opp-info">{props.opportunity.Date_Opened}</div>
    <div className="opp-info">{props.opportunity.Stage}</div>
    <div className="opp-info">{props.opportunity.Type}</div>
  </div>
  )
}  

export default OpportunityCard;
