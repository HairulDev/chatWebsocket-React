import { combineReducers } from 'redux';

import messages from './messages';
import auth from './auth';

export const reducers = combineReducers({ messages, auth });
