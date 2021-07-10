import produce from 'immer';
import { asyncState } from '../lib/reducerUtils';
import {
  GET_SUMMONER_FAILURE,
  GET_SUMMONER_REQUEST,
  GET_SUMMONER_SUCCESS,
} from './actions';
import { SummonerDataAction, SummonerDataState } from './types';
import { createReducer } from 'typesafe-actions';

const initialState: SummonerDataState = {
  summonerData: asyncState.initial(),
};

export default createReducer<SummonerDataState, SummonerDataAction>(
  initialState,
  {
    [GET_SUMMONER_REQUEST]: state =>
      produce(state, draft => {
        draft.summonerData = asyncState.load();
      }),
    [GET_SUMMONER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.summonerData = asyncState.success(action.payload);
      }),
    [GET_SUMMONER_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.summonerData = asyncState.error(action.payload);
      }),
  },
);
