import React from 'react'
import ReactDOM from 'react-dom'

import OpportunityCard from './opportunityCard.jsx'

const OpportunityColumn = (props) => {
    return <div className = "statusColumn">{props.itemsToRender.map((item) => {
      return (<OpportunityCard opportunity = {item}/>)
    })}
    </div>
}

export default OpportunityColumn;