import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(

  //App is wrapped in Browser Router to enable react-router history
  <BrowserRouter>
    <App location = {location} />
  </BrowserRouter>,
  document.getElementById('app'));