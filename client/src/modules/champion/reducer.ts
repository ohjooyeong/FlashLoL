import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { asyncState } from '../lib/reducerUtils';
import {
  GET_CHAMPION_INFO_REQUEST,
  GET_CHAMPION_INFO_SUCCESS,
  GET_CHAMPION_INFO_FAILURE,
} from './actions';
import { ChampionInfoAction, ChampionInfoState } from './types';

const initialState: ChampionInfoState = {
  championInfo: asyncState.initial(),
};

export default createReducer<ChampionInfoState, ChampionInfoAction>(
  initialState,
  {
    [GET_CHAMPION_INFO_REQUEST]: state =>
      produce(state, draft => {
        draft.championInfo = asyncState.load();
      }),
    [GET_CHAMPION_INFO_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.championInfo = asyncState.success(action.payload);
      }),
    [GET_CHAMPION_INFO_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.championInfo = asyncState.error(action.payload);
      }),
  },
);
