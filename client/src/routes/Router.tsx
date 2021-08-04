import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HomePage from './HomePage/HomePage';
import SummonerProfilePage from './SummonerProfilePage/SummonerProfilePage';
import SummonerRankingPage from './SummonerRankingPage/SummonerRankingPage';

function Router() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Wrapper>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/ranking" exact component={SummonerRankingPage} />
            <Route
              path="/summoner/:term"
              exact
              component={SummonerProfilePage}
            />
          </Switch>
        </Wrapper>
        <Footer />
      </>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

export default Router;
