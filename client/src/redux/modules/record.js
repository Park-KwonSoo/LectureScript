import { createAction, handleActions } from 'redux-actions';
import * as RecordAPI from '../../lib/api/record';
import { pender } from 'redux-pender';
import { Map } from 'immutable';


//Actions
const INITIALIZE = 'record/INITIALIZE';
const INITIALIZE_EXCEPT_INFO = 'record/INITIALIZE_EXCEPT_INFO';
const SET_ERROR = 'record/SET_ERROR';
const CHANGE_INPUT = 'record/CHANGE_INPUT';

const MAKE_RECORD_FILE = 'record/MAKE_RECORD_FILE';
const GET_RECORD_LIST = 'record/GET_RECORD_LIST';
const GET_RECORD_BY_ID = 'record/GET_RECORD_BY_ID';


//create Actions
export const initialize = createAction(INITIALIZE);
export const initializeExceptInfo = createAction(INITIALIZE_EXCEPT_INFO);
export const setError = createAction(SET_ERROR);
export const changeInput = createAction(CHANGE_INPUT);

export const makeRecordFile = createAction(MAKE_RECORD_FILE, RecordAPI.makeRecordFile);
export const getRecordList = createAction(GET_RECORD_LIST, RecordAPI.getRecordList);
export const getRecordById = createAction(GET_RECORD_BY_ID, RecordAPI.getRecordById);


//initial State
const initialState = Map({
    input : Map({
        title : '',
        professor : ''
    }),
    recordInfo : null,
    myRecordList : null,
    status : null,
    error : null
});


//export
export default handleActions({
    [INITIALIZE] : () => initialState,
    [INITIALIZE_EXCEPT_INFO] : (state) => {
        const initialInput = initialState.get('input');
        return state.set('input', initialInput).set('myRecordList', null).set('status', null).set('error', null);
    },
    [SET_ERROR] : (state, action) => {
        const { status, message } = action.payload;
        return state.set('error', message).set('status', status);
    },
    [CHANGE_INPUT] : (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['input', name], value);
    },
    ...pender({
        type : MAKE_RECORD_FILE,
        onSuccess : (state, action) => state.set('recordInfo', action.payload.data).set('status', action.payload.status),
        onFailure : (state, action) => state.set('status', action.payload.response.status)
    }),
    ...pender({
        type : GET_RECORD_LIST,
        onSuccess : (state, action) => state.set('myRecordList', action.payload.data).set('status', action.payload.status),
        onFailure : (state, action) => state.set('status', action.payload.response.status)
    }),
    ...pender({
        type : GET_RECORD_BY_ID,
        onSuccess : (state, action) => state.set('recordInfo', action.payload.data).set('status', action.payload.status),
        onFailure : (state, action) => state.set('status', action.payload.response.status)
    })
}, initialState)
