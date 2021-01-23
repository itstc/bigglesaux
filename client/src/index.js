import React from 'react';
import ReactDOM from 'react-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import "./normalize.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Home from './Home';
import NotFound from './NotFound';


const App = () => {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#fff'
      },
      secondary: {
        main: '#eee'
      }
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <Switch>
          <Route path="/404" component={NotFound}/>
          <Route path="/" component={Home}/>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

ReactDOM.render(<App/>, document.getElementById("app"));

