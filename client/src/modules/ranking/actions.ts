import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { RankingDTO } from '../../api/ranking';

// 게임 리스트
export const GET_SUMMONNER_RANKING_REQUEST =
  'ranking/GET_SUMMONNER_RANKING_REQUEST';
export const GET_SUMMONNER_RANKING_SUCCESS =
  'ranking/GET_SUMMONNER_RANKING_SUCCESS';
export const GET_SUMMONNER_RANKING_FAILURE =
  'ranking/GET_SUMMONNER_RANKING_FAILURE';

export const getSummonerRankingAsync = createAsyncAction(
  GET_SUMMONNER_RANKING_REQUEST,
  GET_SUMMONNER_RANKING_SUCCESS,
  GET_SUMMONNER_RANKING_FAILURE,
)<string | string[] | null, RankingDTO, AxiosError>();
