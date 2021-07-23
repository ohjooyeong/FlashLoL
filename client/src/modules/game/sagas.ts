import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { GameDTO, getGameListAPI } from '../../api/game';
import { getGameInfoAsync, GET_GAME_INFO_REQUEST } from './actions';

function* getGame(action: ReturnType<typeof getGameInfoAsync.request>) {
  try {
    const gameData: GameDTO = yield call(getGameListAPI, action.payload);
    yield put(getGameInfoAsync.success(gameData));
  } catch (e) {
    yield put(getGameInfoAsync.failure(e));
  }
}

function* watchGame() {
  yield takeLatest(GET_GAME_INFO_REQUEST, getGame);
}

export default function* gameSaga() {
  yield all([fork(watchGame)]);
}
