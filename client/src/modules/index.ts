import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import summoners from './summoners';
import game from './game';
import summonerSaga from './summoners/sagas';
import gameSaga from './game/sagas';

const rootReducer = combineReducers({
  summoners,
  game,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([summonerSaga(), gameSaga()]);
}
