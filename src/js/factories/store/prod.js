import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware as router } from 'react-router-redux';

import { root } from 'reducers';
import history from 'history';

const StoreFactory = () => {
    return createStore(
        root,
        applyMiddleware(thunk, router(history))
    );
};

export default StoreFactory;