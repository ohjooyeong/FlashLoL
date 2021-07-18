import {
  GET_CHAMPION_INFO_FAILURE,
  GET_CHAMPION_INFO_REQUEST,
  GET_CHAMPION_INFO_SUCCESS,
} from './actions';

const staticData = (
  state = {
    isLoading: true,
    champions: '',
  },
  action: any,
) => {
  switch (action.type) {
    case GET_CHAMPION_INFO_REQUEST:
      return {
        ...state,
      };
    case GET_CHAMPION_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        champions: action.champions,
        error: null,
      };
    case GET_CHAMPION_INFO_FAILURE:
      return {
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default staticData;
