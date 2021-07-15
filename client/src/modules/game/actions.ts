import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { GameDTO, MatchDto } from '../../api/game';

// 게임 리스트
export const GET_GAME_INFO_REQUEST = 'game/GET_GAME_INFO_REQUEST';
export const GET_GAME_INFO_SUCCESS = 'game/GET_GAME_INFO_SUCCESS';
export const GET_GAME_INFO_FAILURE = 'game/GET_GAME_INFO_FAILURE';

export const getGameInfoAsync = createAsyncAction(
  GET_GAME_INFO_REQUEST,
  GET_GAME_INFO_SUCCESS,
  GET_GAME_INFO_FAILURE,
)<string, GameDTO, AxiosError>();

// 게임 상세
export const GET_GAME_DETAIL_INFO_REQUEST = 'game/GET_GAME_DETAIL_INFO_REQUEST';
export const GET_GAME_DETAIL_INFO_SUCCESS = 'game/GET_GAME_DETAIL_INFO_SUCCESS';
export const GET_GAME_DETAIL_INFO_FAILURE = 'game/GET_GAME_DETAIL_INFO_FAILURE';

export const getGameDetailInfoAsync = createAsyncAction(
  GET_GAME_DETAIL_INFO_REQUEST,
  GET_GAME_DETAIL_INFO_SUCCESS,
  GET_GAME_DETAIL_INFO_FAILURE,
)<number, MatchDto, AxiosError>();
