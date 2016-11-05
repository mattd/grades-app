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
    'isAuthenticated is true after a status of authenticated is sent',
    t => {
        const action = {
            type: 'AUTH_STATUS_UPDATED',
            status: 'authenticated'
        };
        const stateBefore = {isAuthenticated: false};

        deepFreeze(action);
        deepFreeze(stateBefore);

        t.true(auth(stateBefore, action).isAuthenticated);
    }
);

test(
    'isAuthenticated is false after a non-authenticated status is sent',
    t => {
        const action = {
            type: 'AUTH_STATUS_UPDATED',
            status: 'unauthenticated'
        };
        const stateBefore = {isAuthenticated: true};

        deepFreeze(action);
        deepFreeze(stateBefore);

        t.false(auth(stateBefore, action).isAuthenticated);
    }
);