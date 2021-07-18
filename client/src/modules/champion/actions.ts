import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';

// 챔피언
export const GET_CHAMPION_INFO_REQUEST = 'champion/GET_CHAMPION_INFO_REQUEST';
export const GET_CHAMPION_INFO_SUCCESS = 'champion/GET_CHAMPION_INFO_SUCCESS';
export const GET_CHAMPION_INFO_FAILURE = 'champion/GET_CHAMPION_INFO_FAILURE';

export const getChampionInfoAsync = createAsyncAction(
  GET_CHAMPION_INFO_REQUEST,
  GET_CHAMPION_INFO_SUCCESS,
  GET_CHAMPION_INFO_FAILURE,
)<undefined, any, AxiosError>();
