import axios from 'axios';

export async function getSummonerAPI(summonerName: string) {
  const response = await axios.post<SummonerDTO>(
    `http://localhost:5000/summoner`,
    { summonerName },
  );
  return response.data;
}

export interface APIStatusDTO {
  success: boolean;
  status?: number;
  message?: string;
}

export interface SummonerInfo {
  accountId: string;
  profileIconId: number;
  revisionDate: number;
  name: string;
  id: string;
  puuid: string;
  summonerLevel: number;
}

export interface SummonerProfile {
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
  freshBlood: boolean;
  inactive: boolean;
  winning_rate: number;
  miniSeries: MiniSeriesDTO;
}

export interface MiniSeriesDTO {
  losses: number;
  progress: string;
  target: number;
  wins: number;
}

export interface SummonerDTO {
  apiStatus: APIStatusDTO;
  summonerProfile: {
    info: SummonerInfo;
    profile: Array<SummonerProfile>;
  };
}
