import { createAction, handleActions } from 'redux-actions';
import * as AuthAPI from '../../lib/api/auth';
import { pender } from 'redux-pender';
import { Map } from 'immutable';

//Actions
const INITIALIZE = 'auth/INITIALIZE';
const SET_ERROR = 'auth/SET_ERROR';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const SET_TOKEN = 'auth/SET_TOKEN';

const REGISTER = 'auth/REGISTER';
const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';


//create Action
export const initialize = createAction(INITIALIZE);
export const setError = createAction(SET_ERROR);
export const changeInput = createAction(CHANGE_INPUT);
export const setToken = createAction(SET_TOKEN);

export const register = createAction(REGISTER, AuthAPI.register);
export const login = createAction(LOGIN, AuthAPI.login);
export const logout = createAction(LOGOUT, AuthAPI.logout);


//initial State
const initialState = Map({
    register : Map({
        email : '',
        name : '',
        password : '',
        passwordConfirm : '',
        status : null,
        success : false
    }),
    login : Map({
        email : '',
        password : '',
        status : null
    }),
    token : null,
    error : null
})


//export
//to Do : set failure 작성
export default handleActions({
    [INITIALIZE] : () => initialState,
    [CHANGE_INPUT] : (state, action) => {
        const { form, name, value } = action.payload;
        return state.setIn([form, name], value);
    },
    [SET_ERROR] : (state, action) => {
        const { form, status, message } = action.payload;
        return state.set('error', message).setIn([form, 'status'], status);
    },
    [SET_TOKEN] : (state, action) => state.set('token', action.payload),
    ...pender({
        type : REGISTER,
        onSuccess : (state, action) => {
            const initialRegister = initialState.get('register');
            return state.set('register', initialRegister).setIn(['register', 'status'], action.payload.status).setIn(['register', 'success'], true);
        },
        onFailure : (state, action) => state.setIn(['register', 'status'], action.payload.response.status)
    }),
    ...pender({
        type : LOGIN,
        onSuccess : (state, action) => {
            const { token } = action.payload.data;
            return state.set('token', token).setIn(['login', 'status'], action.payload.status);
        },
        onFailure : (state, action) => state.setIn(['login', 'status'], action.payload.response.status)
    }),
    ...pender({
        type : LOGOUT,
        onSuccess : () => initialState
    })
}, initialState)
