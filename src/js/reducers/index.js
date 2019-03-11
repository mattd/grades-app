import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as form } from 'redux-form';

import history from '../history';

import auth from './auth';
import build from './build';
import db from './db';
import info from './info';
import profile from './profile';
import terms from './terms';
import ui from './ui';

const router = connectRouter(history);

export const root = combineReducers({
    auth,
    build,
    db,
    form,
    info,
    profile,
    router,
    terms,
    ui
});