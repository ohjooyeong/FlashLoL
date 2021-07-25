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
          <MatchHistory key={m.gameId}>
            <MatchCardContent
              gamedata={m}
              champions={champions}
            ></MatchCardContent>
          </MatchHistory>
        ))}
    </>
  );
}

const MatchHistory = styled.div`
  position: relative;
  border: 1px solid #e6e6e6;
  flex-direction: row;
`;

export default MatchCard;
