import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
      <SummonerSearchForm onSubmitSummonerName={onSubmitSummonerName} />
      {loading && <p style={{ textAlign: 'center' }}>로딩중..</p>}
      {error && <p style={{ textAlign: 'center' }}>에러 발생!</p>}
      {data && console.log(data)}
    </>
  );
}

export default HomePage;
