import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {
    connectRouter,
    routerMiddleware as router
} from 'connected-react-router';


import history from 'history';
import DevTools from 'components/dev-tools';
import { root } from 'reducers';

const enhancer = compose(
    applyMiddleware(thunk, logger, router(history)),
    DevTools.instrument()
);

const StoreFactory = (initialState) => {
    const store = createStore(
        connectRouter(history)(root),
        initialState,
        enhancer
    );

    if (module.hot) {
        module.hot.accept('reducers', () => {
            store.replaceReducer(require('reducers').root)
        });
    }

    return store;
};

export default StoreFactory;