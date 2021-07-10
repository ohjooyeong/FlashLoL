import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { SummonerDTO } from '../../api/summoner';
import { AsyncState } from '../lib/reducerUtils';

export type SummonerDataAction = ActionType<typeof actions>;

export type SummonerDataState = {
  summonerData: AsyncState<SummonerDTO, Error>;
};
