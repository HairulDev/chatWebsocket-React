import { combineReducers } from 'redux';

import messages from './messages';
import auth from './auth';
import users from './users';

export const reducers = combineReducers({ messages, auth, users });
