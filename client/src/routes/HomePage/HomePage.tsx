import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import logoImage from '../../assets/flashlollogo2.png';
import SummonerSearchForm from '../../components/SummonerSearchForm';
import { RootState } from '../../modules';
import { getSummonerDataAsync } from '../../modules/summoners';

function HomePage() {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.summoners.summonerProfile,
  );

  const dispatch = useDispatch();

  const onSubmitSummonerName = (summonerName: string) => {
    dispatch(getSummonerDataAsync.request(summonerName));
  };
  return (
    <>
      <HContainer>
        <MainLogo>
          <Logo>
            <LogoImg></LogoImg>
          </Logo>
        </MainLogo>
        <HomeSearchContainer>
          <SummonerSearchForm
            area={'Home'}
            onSubmitSummonerName={onSubmitSummonerName}
          />
        </HomeSearchContainer>
        {loading && <p style={{ textAlign: 'center' }}>로딩중..</p>}
        {error && <p style={{ textAlign: 'center' }}>에러 발생!</p>}
        {data && console.log(data)}
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

export default HomePage;
