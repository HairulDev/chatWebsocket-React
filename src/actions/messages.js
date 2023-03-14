import { FETCH_MESSAGE, CREATE, FETCH_MESSAGE_BY, UPDATE, } from '../constants/actionTypes';
import axios from "axios";
import env from '../configs/vars';

const API = axios.create({ baseURL: env.reactAppHost });

export const fetchMessage =
  (id, successCB, failedCB) => (dispatch) => {
    API.get(`/messages/${id}`, { withCredentials: false })
      .then((response) => {
        const resAPI = response.data;
        dispatch({
          type: FETCH_MESSAGE_BY,
          payload: resAPI,
        });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {
        return failedCB && failedCB(err);
      });
  };

export const fetchMessages =
  (successCB, failedCB) => (dispatch) => {
    API.get(`/messages`, { withCredentials: false })
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
    API.post(`/messages`, { withCredentials: false }, body)
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

export const updateMessage =
  (id, body, successCB, failedCB) => (dispatch) => {
    console.log("id ke updateMessage", id);
    console.log("body ke updateMessage", body);
    API.put(`/messages/${id}`, { withCredentials: false }, body)
      .then((response) => {
        const resAPI = response.data;
        dispatch({
          type: UPDATE,
          payload: resAPI,
        });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {
        console.log("err ke updateMessage", err);
        return failedCB && failedCB(err);
      });
  };

export const deleteMessage = (id) => () => {
  API.delete(`/messages/${id}`, { withCredentials: false })
    .then((response) => {
      const resAPI = response.data;
    })
    .catch((err) => {
      console.log("err", err);
    });
};