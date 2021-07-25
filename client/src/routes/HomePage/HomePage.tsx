import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import logoImage from '../../assets/flashlollogo2.png';
import SummonerSearchForm from '../../components/SummonerSearchForm';
import SummonerSearchHistory from '../../components/SummonerSearchHistory';

function HomePage({ history }: RouteComponentProps) {
  return (
    <>
      <Helmet>
        <title>Flash LoL</title>
      </Helmet>
      <HContainer>
        <MainLogo>
          <Logo>
            <LogoImg></LogoImg>
          </Logo>
        </MainLogo>
        <HomeSearchContainer>
          <SummonerSearchForm history={history} area={'Home'} />
          <SummonerSearchHistory />
        </HomeSearchContainer>
      </HContainer>
    </>
  );
}

const HContainer = styled.div`
  max-width: 1140px;
  margin: 0 auto;
`;

const MainLogo = styled.div`
  padding: 32px 0 24px;
  margin-top: 20px;
`;

const Logo = styled.div``;

const LogoImg = styled.img`
  display: block;
  max-height: 300px;
  margin: 0 auto;
`;

LogoImg.defaultProps = {
  src: logoImage,
};

const HomeSearchContainer = styled.div`
  text-align: center;
  margin-top: 1.5rem;
`;

export default withRouter(HomePage);
