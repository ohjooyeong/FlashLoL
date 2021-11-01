import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import MatchCardList from '../../components/MatchCard/MatchCardList';
import ProfileCard from '../../components/ProfileCard';
import Loading from '../../components/Loading';
import { RootState } from '../../modules';
import { getSummonerDataAsync } from '../../modules/summoners';
import Error from '../../components/Error';
import Seo from '../../components/Seo';

interface PathParamsProps {
  term: string;
}

function SummonerProfilePage({ match }: RouteComponentProps<PathParamsProps>) {
  const dispatch = useDispatch();
  const { term } = match.params;
  const { data, loading, error } = useSelector(
    (state: RootState) => state.summoners.summonerProfile,
  );

  console.log(data);

  useEffect(() => {
    dispatch(getSummonerDataAsync.request(term));
  }, [term]);

  return (
    <>
      <>
        <Seo
          description={`FlashLoL 소환사 검색: ${term}`}
          title={`소환사 ${term}`}
        />
        {loading ? (
          <Loading types={'spin'}></Loading>
        ) : error ? (
          <Error error={error} />
        ) : (
          data &&
          data.apiStatus.success &&
          data.summonerProfile && (
            <SContainer>
              <SWrapper>
                <ProfileCard
                  profileData={data.summonerProfile.profile}
                  profileInfo={data.summonerProfile.info}
                ></ProfileCard>
                <MatchContainer>
                  <MatchHistoryBoxContainer>
                    <MatchHistoryBoxHeader>
                      {' '}
                      매치 히스토리{' '}
                    </MatchHistoryBoxHeader>
                    <MatchHistoryBoxContent>
                      <MatchHistoryBoxContentFilter>
                        <MatchHistoryBoxContentFilterQueue>
                          <FilterQueueBtn>
                            <span style={{ display: 'inline' }}>전체</span>
                          </FilterQueueBtn>
                        </MatchHistoryBoxContentFilterQueue>
                      </MatchHistoryBoxContentFilter>
                    </MatchHistoryBoxContent>
                  </MatchHistoryBoxContainer>
                  <MatchListContainer>
                    <MatchCardList
                      puuid={data.summonerProfile.info?.puuid}
                    ></MatchCardList>
                  </MatchListContainer>
                </MatchContainer>
              </SWrapper>
            </SContainer>
          )
        )}
      </>
    </>
  );
}

const SContainer = styled.div`
  margin: 0 auto;
  // 540px
  ${props => props.theme.device.tabletS} {
    max-width: 540px;
  }
  // 768px
  ${props => props.theme.device.tabletM} {
    max-width: 720px;
  }
  // 992px
  ${props => props.theme.device.tabletL} {
    max-width: 960px;
  }
  // 1200px
  ${props => props.theme.device.laptop} {
    max-width: 1140px;
  }
`;

const SWrapper = styled.div`
  width: 100%;
  padding-left: 0.46875rem;
  padding-right: 0.46875rem;
  margin-right: auto;
  margin-left: auto;
  margin: auto;
  padding: 2rem 0.445rem;
`;

const MatchContainer = styled.div`
  margin-top: 1rem;
`;

const MatchHistoryBoxContainer = styled.div`
  border: 1px solid #e6e6e6;
`;

const MatchHistoryBoxHeader = styled.div`
  height: 44px;
  line-height: 44px;
  background-color: rgba(250, 250, 250, 0.9);
  border-bottom: 1px solid #e6e6e6;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 14px;
`;

const MatchHistoryBoxContent = styled.div`
  background-color: rgba(250, 250, 250, 0.8);
`;

const MatchHistoryBoxContentFilter = styled.div`
  position: relative;
  padding: 12px 16px;
`;

const MatchHistoryBoxContentFilterQueue = styled.div`
  display: flex;
  flex-direction: row;
`;

const FilterQueueBtn = styled.button`
  margin: 0;
  padding: 2px 6px;
  font-size: 12px;
  cursor: pointer;
  border: none;
  width: auto;
  overflow: visible;
  background: transparent;
  color: #ed6767;
  font: inherit;
  line-height: normal;
  border-bottom: 4px solid #ed6767;
  font-weight: 700;
`;

const MatchListContainer = styled.div`
  margin-top: 1rem;
`;

export default withRouter(SummonerProfilePage);
