import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];

const composeEnhancers =  typeof window === 'object' &&  window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const composingMiddlewareAndDevTools = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, composingMiddlewareAndDevTools);

console.log(store.getState());

export default store;