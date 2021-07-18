import axios from 'axios';

export function getChampionAPI() {
  return axios.get(
    'http://ddragon.leagueoflegends.com/cdn/11.14.1/data/ko_KR/champion.json',
  );
}

export interface ChampionDTO {
  type: string;
  format: string;
  version: string;
  data: any;
}
