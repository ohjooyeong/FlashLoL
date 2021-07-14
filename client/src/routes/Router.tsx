import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from './HomePage/HomePage';
import SummonerProfilePage from './SummonerProfilePage/SummonerProfilePage';

function Router() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/summoner/:term" exact component={SummonerProfilePage} />
        </Switch>
      </>
    </BrowserRouter>
  );
}

export default Router;
