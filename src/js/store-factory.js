import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import auth from './reducers/auth';
import db from './reducers/db';
import forms from './reducers/forms';
import profile from './reducers/profile';
import router from './reducers/router';
import terms from './reducers/terms';
import ui from './reducers/ui';

const middlewares = [thunk];

if (process.env['NODE_ENV'] !== 'production') {
    middlewares.push(
        ...[logger()]
    );
}

const StoreFactory = () => {
    return createStore(
        combineReducers({
            auth,
            db,
            forms,
            profile,
            router,
            terms,
            ui
        }),
        applyMiddleware(...middlewares)
    );
};

export default StoreFactory;