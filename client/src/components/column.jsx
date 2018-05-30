import React from 'react'
import ReactDOM from 'react-dom'

const Column = (props) => {
    return <div className = "statusColumn">{props.stage}</div>
}

export default Column;