import React from 'react';
// Apollo
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
