import axios from 'axios';
import internal from 'stream';
import { api_key } from '../config/api_key';

export async function getSummonerAPI(summonerName: string) {
  const response = await axios.post<SummonerDTO>(
    `http://localhost:5000/summoner`,
    { summonerName },
  );
  return response.data;
}

export interface SummonerDTO {
  // accountId: string;
  // profileIconId: number;
  // revisionDate: number;
  // name: string;
  // id: string;
  // puuid: string;
  // summonerLevel: number;
  leagueId: string;
  summonerId: string;
  summonerName: string;
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  hotStreak: boolean;
  veteran: boolean;
  freshblood: boolean;
  inactive: boolean;
}
