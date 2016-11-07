import test from 'ava';
import deepFreeze from 'deep-freeze';

import auth from 'reducers/auth';

test(
    'isAuthenticated defaults to false',
    t => {
        const action = {type: 'TEST'};

        deepFreeze(action);

        t.false(auth(undefined, action).isAuthenticated);
    }
);

test(
    'isAuthenticated is true after authenticated true is sent',
    t => {
        const action = {
            type: 'AUTH_STATUS_UPDATED',
            authenticated: true
        };
        const stateBefore = {isAuthenticated: false};

        deepFreeze(action);
        deepFreeze(stateBefore);

        t.true(auth(stateBefore, action).isAuthenticated);
    }
);

test(
    'isAuthenticated is false after authenticated false is sent',
    t => {
        const action = {
            type: 'AUTH_STATUS_UPDATED',
            authenticated: false
        };
        const stateBefore = {isAuthenticated: true};

        deepFreeze(action);
        deepFreeze(stateBefore);

        t.false(auth(stateBefore, action).isAuthenticated);
    }
);