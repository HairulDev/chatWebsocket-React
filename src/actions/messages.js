import { FETCH_MESSAGE, CREATE, DELETE, } from '../constants/actionTypes';
import axios from "axios";
import env from '../configs/vars';

const API = axios.create({ baseURL: env.reactAppHost });


export const fetchMessage =
  (successCB, failedCB) => (dispatch) => {
    API.get(`/messages`)
      .then((response) => {
        const resAPI = response.data;
        dispatch({
          type: FETCH_MESSAGE,
          payload: resAPI,
        });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {
        return failedCB && failedCB(err);
      });
  };


export const createMessage =
  (body, successCB, failedCB) => (dispatch) => {
    API.post(`/messages`, body)
      .then((response) => {
        const resAPI = response.data;
        dispatch({
          type: CREATE,
          payload: resAPI,
        });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {
        return failedCB && failedCB(err);
      });
  };

export const deleteMessage = (id) => () => {
  API.delete(`/messages/${id}`)
    .then((response) => {
      const resAPI = response.data;
      console.log("resAPI", resAPI);
    })
    .catch((err) => {
      console.log("err", err);
    });
};