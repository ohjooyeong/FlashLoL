import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MatchlistDto } from '../../api/game';
import { getGameDetailInfoAsync } from '../../modules/game';
import { RootState } from '../../modules';
import styled from 'styled-components';
import MatchCardContent from './MatchCardContent';

type MatchCardProps = {
  matchlist: MatchlistDto;
};

function MatchCard({ matchlist }: MatchCardProps) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.game.summonerDetailGameInfo,
  );
  const { champions } = useSelector((state: RootState) => state.champion);
  useEffect(() => {
    if (matchlist.matches) {
      matchlist.matches.map(game => {
        const { gameId } = game;
        dispatch(getGameDetailInfoAsync.request(gameId));
      });
    }
  }, []);

  return (
    <>
      {data &&
        data.map(m => (
          <MatchHistory key={m.matchdata.gameId}>
            <MatchCardContent
              gamedata={m.matchdata}
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
