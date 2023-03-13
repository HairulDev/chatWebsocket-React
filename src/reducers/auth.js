import { AUTH, END_LOADING, LOGOUT, START_LOADING } from "../constants/actionTypes";

const authReducer = (state = { isLoading: true, authData: null }, action) => {
  switch (action.type) {

    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action.payload, loading: false, errors: null };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };

    default:
      return state;
  }
};

export default authReducer;
