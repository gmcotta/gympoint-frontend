import { combineReducers } from 'redux';

import auth from './auth/reducers';
import admin from './admin/reducers';

export default combineReducers({ auth, admin });
