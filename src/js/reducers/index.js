import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as router } from 'react-router-redux';

import auth from './auth';
import build from './build';
import db from './db';
import profile from './profile';
import terms from './terms';
import ui from './ui';

export const root = combineReducers({
    auth,
    build,
    db,
    form,
    profile,
    router,
    terms,
    ui
});