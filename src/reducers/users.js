import { FETCH_ALL, } from '../constants/actionTypes';


export default (state = { isLoading: true, users: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

