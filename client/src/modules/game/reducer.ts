import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { asyncState } from '../lib/reducerUtils';
import {
  GET_GAME_INFO_REQUEST,
  GET_GAME_INFO_SUCCESS,
  GET_GAME_INFO_FAILURE,
  GET_GAME_DETAIL_INFO_REQUEST,
  GET_GAME_DETAIL_INFO_SUCCESS,
  GET_GAME_DETAIL_INFO_FAILURE,
} from './actions';
import { GameInfoState, GameInfoAction } from './types';

const initialState: GameInfoState = {
  summonerGameInfo: asyncState.initial(),
  summonerDetailGameInfo: { loading: false, data: [], error: null },
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

  [GET_GAME_DETAIL_INFO_REQUEST]: state =>
    produce(state, draft => {
      draft.summonerDetailGameInfo.loading = true;
      draft.summonerDetailGameInfo.data = [];
      draft.summonerDetailGameInfo.error = null;
    }),
  [GET_GAME_DETAIL_INFO_SUCCESS]: (state, action) =>
    produce(state, draft => {
      console.log(action.payload);
      draft.summonerDetailGameInfo.loading = false;
      draft.summonerDetailGameInfo.data =
        draft.summonerDetailGameInfo.data.concat(action.payload);
      draft.summonerDetailGameInfo.error = null;
    }),
  [GET_GAME_DETAIL_INFO_FAILURE]: (state, action) =>
    produce(state, draft => {
      draft.summonerDetailGameInfo.loading = false;
      draft.summonerDetailGameInfo.data = [];
      draft.summonerDetailGameInfo.error = action.payload;
    }),
});
