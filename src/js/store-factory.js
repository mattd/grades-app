import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import auth from './reducers/auth';
import db from './reducers/db';
import profile from './reducers/profile';
import router from './reducers/router';
import ui from './reducers/ui';

const StoreFactory = () => {
    return createStore(
        combineReducers({
            auth,
            db,
            profile,
            router,
            ui
        }),
        applyMiddleware(thunk)
    );
};

export default StoreFactory;