import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Home from './Home';
import NotFound from './NotFound';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/404" component={NotFound}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App/>, document.getElementById("app"));

