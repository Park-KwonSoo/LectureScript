import { createAction, handleActions } from 'redux-actions';
import * as PdfAPI from '../../lib/api/pdf';
import { pender } from 'redux-pender';
import { Map } from 'immutable';

//Actions
const INITIALIZE = 'pdf/INITIALIZE';
const SET_ERROR = 'pdf/SET_ERROR';
const SET_CHANGE_CREATED_DATE = 'pdf/SET_CHANGE_CREATED_DATE';

const MAKE_PDF = 'pdf/MAKE_PDF';


//create Actions
export const initialize = createAction(INITIALIZE);
export const setError = createAction(SET_ERROR);
export const setChangeCreatedDate = createAction(SET_CHANGE_CREATED_DATE);

export const makePdf = createAction(MAKE_PDF, PdfAPI.makePdf);


//initial State
const initialState = Map({
    result : {
        path : null,
        fileName : ''
    },
    createdDate : '',
    status : null,
    error : null
});


//export
export default handleActions({
    [INITIALIZE] : () => initialState,
    [SET_ERROR] : (state, action) => {
        const { status, message } = action.payload;
        return state.set('error', message).set('status', status);
    },
    [SET_CHANGE_CREATED_DATE] : (state, action) => {
        const { createdDate } = action.payload;
        return state.set('createdDate', createdDate);
    },
    ...pender({
        type : MAKE_PDF,
        onSuccess : (state, action) => state.set('result', action.payload.data).set('status', action.payload.status),
        onFailure : (state, action) => state.set('status', action.payload.status)
    })
}, initialState);