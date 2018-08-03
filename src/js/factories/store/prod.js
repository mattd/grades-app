import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
    connectRouter,
    routerMiddleware as router
} from 'connected-react-router'


import { root } from 'reducers';
import history from 'history';

const StoreFactory = () => {
    return createStore(
        connectRouter(history)(root),
        applyMiddleware(thunk, router(history))
    );
};

export default StoreFactory;