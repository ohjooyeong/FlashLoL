import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { ChampionDTO, getChampionAPI } from '../../api/champion';
import {
  getChampionsFailure,
  getChampionsRequest,
  getChampionsSuccess,
  GET_CHAMPIONS,
} from './actions';

type ChampionTemp = {
  config: any;
  data: any;
  headers: any;
  request: any;
  status: number;
  statusText: string;
};

function* getChampion() {
  yield put(getChampionsRequest());
  try {
    const championData: ChampionTemp = yield call(getChampionAPI);
    yield put(getChampionsSuccess(championData.data));
  } catch (e) {
    yield put(getChampionsFailure(e));
  }
}

export default function* watchChampions() {
  yield takeEvery(GET_CHAMPIONS, getChampion);
}
