import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import summoners from './summoners';
import game from './game';
import champion from './champion';
import summonerSaga from './summoners/sagas';
import gameSaga from './game/sagas';
import watchChampions from './champion/sagas';

const rootReducer = combineReducers({
  summoners,
  game,
  champion,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([summonerSaga(), gameSaga(), watchChampions()]);
}
