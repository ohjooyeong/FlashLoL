import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { getSummonerRankingAPI, RankingDTO } from '../../api/ranking';
import {
  getSummonerRankingAsync,
  GET_SUMMONNER_RANKING_REQUEST,
} from './actions';

function* getSummonerRanking(
  action: ReturnType<typeof getSummonerRankingAsync.request>,
) {
  try {
    const rankingData: RankingDTO = yield call(
      getSummonerRankingAPI,
      action.payload,
    );
    yield put(getSummonerRankingAsync.success(rankingData));
  } catch (e) {
    yield put(getSummonerRankingAsync.failure(e));
  }
}

function* watchRanking() {
  yield takeLatest(GET_SUMMONNER_RANKING_REQUEST, getSummonerRanking);
}

export default function* rankingSaga() {
  yield all([fork(watchRanking)]);
}
