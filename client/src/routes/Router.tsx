import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage/HomePage';

function Router() {
  return (
    <BrowserRouter>
      <>
        <Switch>
          <Route path="/" exact component={HomePage} />
        </Switch>
      </>
    </BrowserRouter>
  );
}

export default Router;
