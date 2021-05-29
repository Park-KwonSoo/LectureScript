import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender'; 

import auth from './auth';
import pdf from './pdf';
import record from './record';

export default combineReducers ({
    auth,
    pdf,
    record,
    pender : penderReducer
});