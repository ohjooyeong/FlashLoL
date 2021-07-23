import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { asyncState } from '../lib/reducerUtils';
import {
  GET_GAME_INFO_REQUEST,
  GET_GAME_INFO_SUCCESS,
  GET_GAME_INFO_FAILURE,
} from './actions';
import { GameInfoState, GameInfoAction } from './types';

const initialState: GameInfoState = {
  summonerGameInfo: asyncState.initial(),
};

export default createReducer<GameInfoState, GameInfoAction>(initialState, {
  [GET_GAME_INFO_REQUEST]: state =>
    produce(state, draft => {
      draft.summonerGameInfo = asyncState.load();
    }),
  [GET_GAME_INFO_SUCCESS]: (state, action) =>
    produce(state, draft => {
      draft.summonerGameInfo = asyncState.success(action.payload);
    }),
  [GET_GAME_INFO_FAILURE]: (state, action) =>
    produce(state, draft => {
      draft.summonerGameInfo = asyncState.error(action.payload);
    }),
});
