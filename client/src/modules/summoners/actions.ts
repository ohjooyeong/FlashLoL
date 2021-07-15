import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { SummonerDTO } from '../../api/summoner';

// 소환사 검색
export const GET_SUMMONER_REQUEST = 'summoner/GET_SUMMONER_REQUEST';
export const GET_SUMMONER_SUCCESS = 'summoner/GET_SUMMONER_SUCCESS';
export const GET_SUMMONER_FAILURE = 'summoner/GET_SUMMONER_FAILURE';

//

export const getSummonerDataAsync = createAsyncAction(
  GET_SUMMONER_REQUEST,
  GET_SUMMONER_SUCCESS,
  GET_SUMMONER_FAILURE,
)<string, SummonerDTO, AxiosError>();
