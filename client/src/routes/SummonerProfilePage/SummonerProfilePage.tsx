import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import MatchCardList from '../../components/MatchCard/MatchCardList';
import ProfileCard from '../../components/ProfileCard';
import { RootState } from '../../modules';
import { getSummonerDataAsync } from '../../modules/summoners';

interface PathParamsProps {
  term: string;
}

function SummonerProfilePage({ match }: RouteComponentProps<PathParamsProps>) {
  const dispatch = useDispatch();
  const { term } = match.params;
  const { data, loading, error } = useSelector(
    (state: RootState) => state.summoners.summonerProfile,
  );

  useEffect(() => {
    dispatch(getSummonerDataAsync.request(term));
  }, [term]);

  return (
    <>
      {!loading && data && data.summonerProfile && (
        <SContainer>
          <SWrapper>
            <ProfileCard
              profileData={data.summonerProfile.profile}
              profileInfo={data.summonerProfile.info}
            ></ProfileCard>
            <MatchContainer>
              <MatchHistoryBoxContainer></MatchHistoryBoxContainer>
              <MatchListContainer>
                <MatchCardList
                  accountId={data.summonerProfile.info.accountId}
                ></MatchCardList>
              </MatchListContainer>
            </MatchContainer>
          </SWrapper>
        </SContainer>
      )}
    </>
  );
}

const SContainer = styled.div`
  max-width: 1140px;
  margin: 0 auto;
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

const MatchHistoryBoxContainer = styled.div``;

const MatchListContainer = styled.div`
  margin-top: 1rem;
`;

export default withRouter(SummonerProfilePage);
