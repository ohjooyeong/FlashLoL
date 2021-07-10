import axios from 'axios';
import { api_key } from '../config/api_key';

export async function getSummonerDataAPI(summonerName: string) {
  const response = await axios.get<SummonerDTO>(
    `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${api_key}`,
  );
  console.log(response.data);
  return response.data;
}

export interface SummonerDTO {
  accountId: string;
  profileIconId: number;
  revisionDate: number;
  name: string;
  id: string;
  puuid: string;
  summonerLevel: number;
}
