import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import styled from 'styled-components';
import MatchCardContent from './MatchCardContent';

function MatchCard() {
  const { data, loading } = useSelector(
    (state: RootState) => state.game.summonerGameInfo,
  );
  const { champions } = useSelector((state: RootState) => state.champion);

  return (
    <>
      {!loading &&
        data &&
        data.apiStatus.success &&
        data.gameInfo.matchDetailList.map(m => (
          <MatchContainer key={m.gameId}>
            <MatchCardContent
              gamedata={m}
              champions={champions}
            ></MatchCardContent>
          </MatchContainer>
        ))}
    </>
  );
}

const MatchContainer = styled.div`
  margin-top: 0.5rem;
  font-weight: 600;
`;

export default MatchCard;
