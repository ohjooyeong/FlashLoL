import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { AsyncState } from '../lib/reducerUtils';
import { RankingDTO } from '../../api/ranking';

export type SummonerRankingAction = ActionType<typeof actions>;

export type SummonerRankingState = {
  summonerRanking: AsyncState<RankingDTO, Error>;
};
