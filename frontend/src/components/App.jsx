/**
 * App is the main module handling all the routing.
 */
import React from 'react';
// React Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Material UI
import { CssBaseline } from '@material-ui/core';
// Components
import Welcome from './Welcome';
import Places from './Places';

const App = () => (
  <Router>
    <CssBaseline />
    <Switch>
      <Route path="/:placeId">
        <Places />
      </Route>
      <Route path="/">
        <Welcome />
      </Route>
    </Switch>
  </Router>
);


export default App;
