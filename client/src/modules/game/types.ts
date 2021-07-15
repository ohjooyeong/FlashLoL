import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { GameDTO, MatchDto } from '../../api/game';
import { AsyncState } from '../lib/reducerUtils';

export type GameInfoAction = ActionType<typeof actions>;

export type GameInfoState = {
  summonerGameInfo: AsyncState<GameDTO, Error>;
  summonerDetailGameInfo: {
    loading: boolean;
    data: Array<MatchDto>;
    error: null | any;
  };
};
