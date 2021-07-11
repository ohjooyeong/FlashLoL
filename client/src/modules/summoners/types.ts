import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { SummonerDTO } from '../../api/summoner';
import { AsyncState } from '../lib/reducerUtils';

export type SummonerProfileAction = ActionType<typeof actions>;

export type SummonerProfileState = {
  summonerProfile: AsyncState<SummonerDTO, Error>;
};
