import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { AsyncState } from '../lib/reducerUtils';
import { ChampionDTO } from '../../api/champion';

export type ChampionInfoAction = ActionType<typeof actions>;

export type ChampionInfoState = {
  championInfo: any;
};
