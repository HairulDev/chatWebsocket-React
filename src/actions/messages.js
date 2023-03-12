import { FETCH_MESSAGE, CREATE, DELETE, } from '../constants/actionTypes';
import axios from "axios";
import env from '../configs/vars';

const API = axios.create({ baseURL: env.reactAppHost });


export const fetchMessage =
  (successCB, failedCB) => async (dispatch) => {
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
  (body, successCB, failedCB) => async (dispatch) => {
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

export const deleteMessage = (id) => async (dispatch) => {
  API.delete(`/messages/${id}`)
    .then((response) => {
      const resAPI = response.data;
      dispatch({ type: DELETE, payload: id });
      dispatch({
        type: FETCH_MESSAGE,
        payload: resAPI,
      });
    })
    .catch((err) => {
    });
};