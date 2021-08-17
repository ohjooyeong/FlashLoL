import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import logoImage from '../../assets/flashlollogo2.png';
import SummonerSearchForm from '../../components/SummonerSearchForm';
import SummonerSearchHistory from '../../components/SummonerSearchHistory';
import Seo from '../../components/Seo';

function HomePage({ history }: RouteComponentProps) {
  return (
    <>
      <Seo
        description={
          'FlashLoL 소환사 검색을 통해 리그오브레전드 전적내역을 확인할 수 있어요!'
        }
        title={'Flash LoL'}
      />
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
  max-height: 200px;
  margin: 0 auto;
  // 576px
  ${props => props.theme.device.tabletS} {
    max-height: 300px;
  }
`;

LogoImg.defaultProps = {
  src: logoImage,
};

const HomeSearchContainer = styled.div`
  text-align: center;
  margin-top: 1.5rem;
`;

export default withRouter(HomePage);
