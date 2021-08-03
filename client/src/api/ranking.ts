import axios from 'axios';
import { SERVER_URL } from '../config/every_url';
import { APIStatusDTO } from './summoner';

export async function getSummonerRankingAPI(page: string) {
  const response = await axios.post<RankingDTO>(`${SERVER_URL}/ranking`, {
    page,
  });
  return response.data;
}

export interface SummonerRakingDTO {
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  queue: string;
  tier: string;
  rank: string;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

export interface RankingDTO {
  apiStatus: APIStatusDTO;
  summonerRankData: Array<SummonerRakingDTO>;
}