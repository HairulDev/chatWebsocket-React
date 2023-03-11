import { AUTH, } from '../constants/actionTypes';

import axios from "axios";
import env from '../configs/vars';



const API = axios.create({ baseURL: env.reactAppHost });
export const signin =
  (data) => async (dispatch) => {
    try {
      dispatch({ type: AUTH, payload: data });
    } catch (error) {
      console.log("error signin", error);
    }
  };

