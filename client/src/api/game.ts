import axios from 'axios';
import { APIStatusDTO } from './summoner';

export async function getGameListAPI(accountId: string) {
  const response = await axios.post<GameDTO>(
    `http://localhost:5000/summoner/game`,
    { accountId },
  );
  return response.data;
}

export async function getGameDetailAPI(gameId: number) {
  const response = await axios.get<MatchDto>(
    `http://localhost:5000/summoner/game/${gameId}`,
  );
  return response.data;
}

export interface MatchReferenceDto {
  gameId: number;
  role: string;
  season: number;
  platformId: string;
  champion: number;
  queue: number;
  lane: string;
  timestamp: number;
}

export interface MatchDto {
  gameId: number;
  participantIdentities: Array<any>;
  queueId: number;
  gameType: string;
  gameDuration: number;
  teams: Array<any>;
  platformId: string;
  gameCreation: number;
  seasonId: number;
  gameVersion: string;
  mapId: number;
  gameMode: string;
  participants: Array<any>;
}

export interface MatchlistDto {
  startIndex: number;
  totalGames: number;
  endIndex: number;
  matches: Array<MatchReferenceDto>;
}

export interface GameDTO {
  apiStatus: APIStatusDTO;
  summonerGameInfo: {
    matchlist: MatchlistDto;
  };
  summonerDetailGameInfo: {
    matchlist: Array<MatchDto>;
  };
}
