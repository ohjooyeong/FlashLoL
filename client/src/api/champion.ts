import axios from 'axios';
import { RIOT_CDN } from '../config/cdn_value';

export function getChampionAPI() {
  return axios.get(`${RIOT_CDN}/data/ko_KR/champion.json`);
}

export interface ChampionDTO {
  type: string;
  format: string;
  version: string;
  data: any;
}
