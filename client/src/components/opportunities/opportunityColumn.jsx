import React from 'react';
import OpportunityCard from './opportunityCard.jsx';

const OpportunityColumn = (props) => {
    return (
      <div className = {`status-column ${ props.status.replace(/\s+/g, '-').toLowerCase() }`}>
        <div>{props.status}
        {props.itemsToRender.map((item) => {
          return (<OpportunityCard  selectOpportunity= {props.selectOpportunity} 
                                    opportunity={item} 
                                    update = {props.update}
                                    deleteOpp = {props.deleteOpp}/>)
        })}
        </div>
      </div>
    );
}

export default OpportunityColumn;