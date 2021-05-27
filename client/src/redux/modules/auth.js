import { createAction, handleActions } from 'redux-actions';
import * as AuthAPI from '../../lib/api/auth';
import { pender } from 'redux-pender';
import { Map } from 'immutable';

//Actions
const INITIALIZE = 'auth/INITIALIZE';
const SET_ERROR = 'auth/SET_ERROR';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';

const REGISTER = 'auth/REGISTER';
const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';


//create Action
export const initialize = createAction(INITIALIZE);
export const setError = createAction(SET_ERROR);
export const changeInput = createAction(CHANGE_INPUT);

export const register = createAction(REGISTER, AuthAPI.register);
export const login = createAction(LOGIN, AuthAPI.login);
export const logout = createAction(LOGOUT, AuthAPI.logout);


//initial State
const initialState = Map({
    register : Map({
        email : '',
        name : '',
        password : '',
        success : false
    }),
    login : Map({
        email : '',
        password : ''
    }),
    token : null,
    error : null
})


//export
export default handleActions({
    [INITIALIZE] : () => initialState,
    [CHANGE_INPUT] : (state, action) => {
        const { form, name, value } = action.payload;
        return state.setIn([form, name], value);
    },
    [SET_ERROR] : (state, action) => {
        const { message } = action.payload;
        return state.set('error', message);
    },
    ...pender({
        type : REGISTER,
        onSuccess : (state) => {
            const initialRegister = initialState.get('register');
            return state.set('register', initialRegister).setIn(['register', 'success'], true);
        }
    }),
    ...pender({
        type : LOGIN,
        onSuccess : (state, action) => {
            const { token } = action.payload.data;
            return state.set('token', token);
        }
    }),
    ...pender({
        type : LOGOUT,
        onSuccess : () => initialState
    })
}, initialState)
