import React from 'react';
import OpportunityCard from './opportunityCard.jsx';

const OpportunityColumn = (props) => {
    return (
      <div className = "statusColumn">
        <div>{props.status}
        {props.itemsToRender.map((item) => {
          return (<OpportunityCard selectOpportunity={props.selectOpportunity} opportunity={item} deleteOpp = {props.deleteOpp} archiveOpportunity = {props.archiveOpportunity}/>)
        })}
        </div>
      </div>
    );
}

export default OpportunityColumn;