import React from 'react';
import OpportunityCard from './opportunityCard.jsx';

const OpportunityColumn = (props) => {
    return (
      <div className = "statusColumn">{props.itemsToRender.map((item) => {
        return (<OpportunityCard selectOpportunity={props.selectOpportunity} opportunity={item}/>)
      })}
      </div>
    );
}

export default OpportunityColumn;