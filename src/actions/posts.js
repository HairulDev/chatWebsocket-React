import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT, FETCH_BY_CREATOR } from '../constants/actionTypes';
import * as api from '../api/index.js';

import axios from "axios";
import env from '../configs/vars';

const API = axios.create({ baseURL: env.reactAppHost });

export const getPosts =
  (successCB, failedCB) => async (dispatch) => {
    API.get(`/messages`)
      .then((response) => {
        const resAPI = response.data;
        dispatch({
          type: FETCH_POST,
          payload: resAPI,
        });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {
        return failedCB && failedCB(err);
      });
  };

export const createPost =
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


export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  try {
    const { data } = await api.likePost(id, user?.token);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
