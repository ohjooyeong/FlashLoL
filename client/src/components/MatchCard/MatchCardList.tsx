import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGameInfoAsync } from '../../modules/game';
import { RootState } from '../../modules';
import MatchCard from './MatchCard';
import { getChampions } from '../../modules/champion';
import Loading from '../Loading';

type MatchCardListProps = {
  accountId: string;
};

function MatchCardList({ accountId }: MatchCardListProps) {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    (state: RootState) => state.game.summonerGameInfo,
  );

  useEffect(() => {
    dispatch(getChampions());
    dispatch(getGameInfoAsync.request(accountId));
  }, []);

  return (
    <>
      {loading ? (
        <Loading types={'bars'}></Loading>
      ) : (
        data && data.apiStatus.success && <MatchCard></MatchCard>
      )}
    </>
  );
}

export default MatchCardList;
