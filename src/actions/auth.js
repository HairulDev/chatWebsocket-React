import { AUTH, END_LOADING, START_LOADING } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin =
  (data) => async (dispatch) => {
    try {
      dispatch({ type: AUTH, payload: data });
    } catch (error) {
      console.log("error signin", error);
    }
  };