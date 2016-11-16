import { createStore, combineReducers } from 'redux';

import auth from './reducers/auth';
import profile from './reducers/profile';
import router from './reducers/router';

const StoreFactory = () => {
    return createStore(
        combineReducers({
            auth,
            profile,
            router
        })
    );
};

export default StoreFactory;