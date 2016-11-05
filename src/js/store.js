import { browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';

const middleware = routerMiddleware(browserHistory);

const store = createStore(
    combineReducers({
        routing: routerReducer
    }),
    applyMiddleware(middleware)
);

export default store;