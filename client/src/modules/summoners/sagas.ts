import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { getSummonerAPI, SummonerDTO } from '../../api/summoner';
import { getSummonerDataAsync, GET_SUMMONER_REQUEST } from './actions';

function* getSummoner(action: ReturnType<typeof getSummonerDataAsync.request>) {
  try {
    const summonerData: SummonerDTO = yield call(
      getSummonerAPI,
      action.payload,
    );
    yield put(getSummonerDataAsync.success(summonerData));
  } catch (e) {
    yield put(getSummonerDataAsync.failure(e));
  }
}

function* watchSummoner() {
  yield takeLatest(GET_SUMMONER_REQUEST, getSummoner);
}

export default function* summonerSaga() {
  yield all([fork(watchSummoner)]);
}
