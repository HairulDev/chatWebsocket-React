import { AUTH, } from '../constants/actionTypes';

export const signin =
  (data) => async (dispatch) => {
    try {
      dispatch({ type: AUTH, payload: data });
    } catch (error) {
      console.log("error signin", error);
    }
  };