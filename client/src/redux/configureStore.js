import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import penderMiddleWare from 'redux-pender';
import reducer from './modules'

const configureStore = (initialState) => {
    const store = createStore(reducer, initialState, composeWithDevTools(
        applyMiddleware(penderMiddleWare())
    ));
    
    return store;
}

export default configureStore;