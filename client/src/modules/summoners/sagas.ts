import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { getSummonerDataAPI, SummonerDTO } from '../../api/summoner';
import { getSummonerDataAsync, GET_SUMMONER_REQUEST } from './actions';

function* getSummonerData(
  action: ReturnType<typeof getSummonerDataAsync.request>,
) {
  try {
    const summonerData: SummonerDTO = yield call(
      getSummonerDataAPI,
      action.payload,
    );
    yield put(getSummonerDataAsync.success(summonerData));
  } catch (e) {
    yield put(getSummonerDataAsync.failure(e));
  }
}

function* watchSummoner() {
  yield takeLatest(GET_SUMMONER_REQUEST, getSummonerData);
}

export default function* summonerSaga() {
  yield all([fork(watchSummoner)]);
}
