import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { ChampionDTO, getChampionAPI } from '../../api/champion';
import { getChampionInfoAsync, GET_CHAMPION_INFO_REQUEST } from './actions';

function* getChampion() {
  try {
    const championData: ChampionDTO = yield call(getChampionAPI);
    console.log(championData);
    yield put(getChampionInfoAsync.success(championData));
  } catch (e) {
    yield put(getChampionInfoAsync.failure(e));
  }
}

function* watchChampions() {
  yield takeEvery(GET_CHAMPION_INFO_REQUEST, getChampion);
}

export default function* championSaga() {
  yield all([fork(watchChampions)]);
}
