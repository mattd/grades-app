import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './auth';
import build from './build';
import db from './db';
import info from './info';
import profile from './profile';
import terms from './terms';
import ui from './ui';

export const root = combineReducers({
    auth,
    build,
    db,
    form,
    info,
    profile,
    terms,
    ui
});