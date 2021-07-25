// 챔피언

export const GET_CHAMPIONS = 'champion/GET_CHAMPIONS';
export const GET_CHAMPION_INFO_REQUEST = 'champion/GET_CHAMPION_INFO_REQUEST';
export const GET_CHAMPION_INFO_SUCCESS = 'champion/GET_CHAMPION_INFO_SUCCESS';
export const GET_CHAMPION_INFO_FAILURE = 'champion/GET_CHAMPION_INFO_FAILURE';

export const getChampions = () => {
  return {
    type: GET_CHAMPIONS,
  };
};

export const getChampionsRequest = () => {
  return {
    type: GET_CHAMPION_INFO_REQUEST,
  };
};

export const getChampionsSuccess = (champions: any) => {
  return {
    type: GET_CHAMPION_INFO_SUCCESS,
    champions,
  };
};

export const getChampionsFailure = (error: any) => {
  return {
    type: GET_CHAMPION_INFO_FAILURE,
    error,
  };
};
