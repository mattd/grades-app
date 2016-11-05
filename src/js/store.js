import { browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import auth from './reducers/auth';

const middleware = routerMiddleware(browserHistory);

const store = createStore(
    combineReducers({
        auth,
        routing: routerReducer
    }),
    applyMiddleware(middleware)
);

export default store;