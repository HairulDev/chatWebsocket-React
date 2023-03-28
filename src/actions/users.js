import { FETCH_ALL, } from '../constants/actionTypes';
import axios from "axios";
import env from '../configs/vars';

const API = axios.create({ baseURL: "http://ec2-18-140-62-35.ap-southeast-1.compute.amazonaws.com:3001" });

export const fetchUser =
  (successCB, failedCB) => async (dispatch) => {
    API.get(`/users`)
      .then((response) => {
        const resAPI = response.data;
        dispatch({
          type: FETCH_ALL,
          payload: resAPI,
        });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {
        return failedCB && failedCB(err);
      });
  };

