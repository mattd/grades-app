import { createStore, combineReducers } from 'redux';

import auth from './reducers/auth';
import profile from './reducers/profile';

const store = createStore(
    combineReducers({
        auth,
        profile
    })
);

export default store;