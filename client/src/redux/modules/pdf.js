import { createAction, handleActions } from 'redux-actions';
import * as PdfAPI from '../../lib/api/pdf';
import { pender } from 'redux-pender';
import { Map } from 'immutable';

//Actions
const INITIALIZE = 'pdf/INITIALIZE';
const SET_ERROR = 'pdf/SET_ERROR';

const MAKE_PDF = 'pdf/MAKE_PDF';


//create Actions
export const initialize = createAction(INITIALIZE);
export const setError = createAction(SET_ERROR);

export const makePdf = createAction(MAKE_PDF, PdfAPI.makePdf);


//initial State
const initialState = Map({
    result : {
        path : '',
        fileName : ''
    },
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
        type : MAKE_PDF,
        onSuccess : (state, action) => state.set('result', action.payload.data)
    })
}, initialState);