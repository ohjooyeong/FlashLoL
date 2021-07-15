import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGameInfoAsync } from '../modules/game';
import { RootState } from '../modules';
import MatchCard from './MatchCard';

type MatchCardListProps = {
  accountId: string;
};

function MatchCardList({ accountId }: MatchCardListProps) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.game.summonerGameInfo,
  );

  useEffect(() => {
    dispatch(getGameInfoAsync.request(accountId));
  }, []);
  return (
    <>
      {data && (
        <MatchCard matchlist={data.summonerGameInfo.matchlist}></MatchCard>
      )}
    </>
  );
}

export default MatchCardList;
