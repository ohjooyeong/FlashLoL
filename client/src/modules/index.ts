import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import summoners from './summoners';
import summonerSaga from './summoners/sagas';

const rootReducer = combineReducers({
  summoners,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([summonerSaga()]);
}
