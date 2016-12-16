import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import DevTools from '../../components/dev-tools';

import { root } from '../../reducers';

const enhancer = compose(
    applyMiddleware(thunk, logger()),
    DevTools.instrument()
);

const StoreFactory = (initialState) => {
    const store = createStore(
        root,
        initialState,
        enhancer
    );

    if (module.hot) {
        module.hot.accept('../../reducers', () => {
            store.replaceReducer(require('../../reducers').root)
        });
    }

    return store;
};

export default StoreFactory;