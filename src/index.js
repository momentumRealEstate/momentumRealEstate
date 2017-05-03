import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import App from './components/App'
>>>>>>> dc0c57e85dfb630db38b7b4c4aeaadef6f1920f9
import './index.css';


ReactDOM.render(
	<Router history={hashHistory}>
    <Route path="/" component={App}/>
  </Router>,
  document.getElementById('root'))
