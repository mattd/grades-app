import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import auth from './reducers/auth';
import profile from './reducers/profile';
import teacher from './reducers/teacher';
import ui from './reducers/ui';
import router from './reducers/router';

const StoreFactory = () => {
    return createStore(
        combineReducers({
            auth,
            profile,
            teacher,
            ui,
            router
        }),
        applyMiddleware(thunk)
    );
};

export default StoreFactory;