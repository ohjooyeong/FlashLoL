import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { asyncState } from '../lib/reducerUtils';
import {
  GET_SUMMONNER_RANKING_REQUEST,
  GET_SUMMONNER_RANKING_SUCCESS,
  GET_SUMMONNER_RANKING_FAILURE,
} from './actions';
import { SummonerRankingAction, SummonerRankingState } from './types';

const initialState: SummonerRankingState = {
  summonerRanking: asyncState.initial(),
};

export default createReducer<SummonerRankingState, SummonerRankingAction>(
  initialState,
  {
    [GET_SUMMONNER_RANKING_REQUEST]: state =>
      produce(state, draft => {
        draft.summonerRanking = asyncState.load();
      }),
    [GET_SUMMONNER_RANKING_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.summonerRanking = asyncState.success(action.payload);
      }),
    [GET_SUMMONNER_RANKING_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.summonerRanking = asyncState.error(action.payload);
      }),
  },
);
