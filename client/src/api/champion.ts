import axios from 'axios';

export async function getChampionAPI() {
  const response = await axios.get<ChampionDTO>(
    'http://localhost:5000/summoner/champion',
  );
  return response.data;
}

export interface ChampionDTO {
  type: string;
  format: string;
  version: string;
  data: any;
}
