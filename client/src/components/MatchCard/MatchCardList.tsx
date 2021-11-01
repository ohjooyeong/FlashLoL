import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGameInfoAsync } from '../../modules/game';
import { RootState } from '../../modules';
import MatchCard from './MatchCard';
import { getChampions } from '../../modules/champion';
import Loading from '../Loading';

type MatchCardListProps = {
  puuid: string;
};

function MatchCardList({ puuid }: MatchCardListProps) {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    (state: RootState) => state.game.summonerGameInfo,
  );

  useEffect(() => {
    dispatch(getChampions());
    dispatch(getGameInfoAsync.request(puuid));
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
