import produce from 'immer';
import { asyncState } from '../lib/reducerUtils';
import {
  GET_SUMMONER_FAILURE,
  GET_SUMMONER_REQUEST,
  GET_SUMMONER_SUCCESS,
} from './actions';
import { SummonerProfileAction, SummonerProfileState } from './types';
import { createReducer } from 'typesafe-actions';

const initialState: SummonerProfileState = {
  summonerProfile: asyncState.initial(),
};

export default createReducer<SummonerProfileState, SummonerProfileAction>(
  initialState,
  {
    [GET_SUMMONER_REQUEST]: state =>
      produce(state, draft => {
        draft.summonerProfile = asyncState.load();
      }),
    [GET_SUMMONER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.summonerProfile = asyncState.success(action.payload);
      }),
    [GET_SUMMONER_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.summonerProfile = asyncState.error(action.payload);
      }),
  },
);
