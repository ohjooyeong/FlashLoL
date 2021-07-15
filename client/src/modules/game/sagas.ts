import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {
  GameDTO,
  getGameDetailAPI,
  getGameListAPI,
  MatchDto,
} from '../../api/game';
import {
  getGameInfoAsync,
  GET_GAME_INFO_REQUEST,
  getGameDetailInfoAsync,
  GET_GAME_DETAIL_INFO_REQUEST,
} from './actions';

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

function* getGameDetail(
  action: ReturnType<typeof getGameDetailInfoAsync.request>,
) {
  try {
    const gameData: MatchDto = yield call(getGameDetailAPI, action.payload);
    yield put(getGameDetailInfoAsync.success(gameData));
  } catch (e) {
    yield put(getGameDetailInfoAsync.failure(e));
  }
}

function* watchGameDetail() {
  yield takeEvery(GET_GAME_DETAIL_INFO_REQUEST, getGameDetail);
}

export default function* gameSaga() {
  yield all([fork(watchGame), fork(watchGameDetail)]);
}
