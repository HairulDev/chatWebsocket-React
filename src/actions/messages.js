import { FETCH_MESSAGE, CREATE, FETCH_MESSAGE_BY, UPDATE, } from '../constants/actionTypes';
import axios from "axios";
import env from '../configs/vars';

const API = axios.create({
  baseURL: env.reactAppHost,
  headers: {
    'x-forwarded-proto': 'http',
  },

});


export const fetchMessage =
  (id, successCB, failedCB) => (dispatch) => {
    API.get(`/messages/${id}`)
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

export const updateMessage =
  (id, body, successCB, failedCB) => (dispatch) => {
    console.log("id ke updateMessage", id);
    console.log("body ke updateMessage", body);
    API.put(`/messages/${id}`, body)
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
  API.delete(`/messages/${id}`)
    .then((response) => {
      const resAPI = response.data;
    })
    .catch((err) => {
      console.log("err", err);
    });
};