import { createAction, handleActions } from 'redux-actions';
import * as RecordAPI from '../../lib/api/record';
import { pender } from 'redux-pender';
import { Map } from 'immutable';


//Actions
const INITIALIZE = 'record/INITIALIZE';
const SET_ERROR = 'record/SET_ERROR';

const MAKE_RECORD_FILE = 'record/MAKE_RECORD_FILE';
const GET_RECORD_LIST = 'record/GET_RECORD_LIST';
const GET_RECORD_BY_ID = 'record/GET_RECORD_BY_ID';


//create Actions
export const initialize = createAction(INITIALIZE);
export const setError = createAction(SET_ERROR);

export const makeRecordFile = createAction(MAKE_RECORD_FILE, RecordAPI.makeRecordFile);
export const getRecordList = createAction(GET_RECORD_LIST, RecordAPI.getRecordList);
export const getRecordById = createAction(GET_RECORD_BY_ID, RecordAPI.getRecordById);


//initial State
const initialState = Map({
    recordInfo : {},
    myRecordList : [],
    error : null
});


//export
export default handleActions({
    [INITIALIZE] : () => initialState,
    [SET_ERROR] : (state, action) => {
        const { message } = action.payload;
        return state.set('error', message);
    },
    ...pender({
        type : MAKE_RECORD_FILE,
        onSuccess : (state, action) => state.set('recordInfo', action.payload.data)
    }),
    ...pender({
        type : GET_RECORD_LIST,
        onSuccess : (state, action) => state.set('myRecordList', action.payload.data)
    }),
    ...pender({
        type : GET_RECORD_BY_ID,
        onSuccess : (state, action) => state.set('recordInfo', action.payload.data)
    })
}, initialState)
