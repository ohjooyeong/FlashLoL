import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from './HomePage/HomePage';

function Router() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
        </Switch>
      </>
    </BrowserRouter>
  );
}

export default Router;
