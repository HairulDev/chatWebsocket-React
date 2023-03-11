import axios from 'axios';
import env from '../configs/vars';


const API = axios.create({ baseURL: env.reactAppHost });

export const createPost = (newPost) => API.post(`/messages`, newPost);
export const getPosts = () => API.get(`/messages`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
