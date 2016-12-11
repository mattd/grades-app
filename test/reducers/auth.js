import test from 'ava';
import deepFreeze from 'deep-freeze';

import auth from 'reducers/auth';
import { AUTH_STATUS_UPDATED, AUTH_STATUS_READY } from 'actions/types/auth';

test(
    'isAuthenticated defaults to false',
    t => {
        const action = {type: 'TEST'};

        t.false(auth(undefined, action).isAuthenticated);
    }
);

test(
    'isAuthenticated can become true',
    t => {
        const action = {
            type: AUTH_STATUS_UPDATED,
            authenticated: true
        };
        const stateBefore = {isAuthenticated: false};

        deepFreeze(stateBefore);

        t.true(auth(stateBefore, action).isAuthenticated);
    }
);

test(
    'isAuthenticated can become false',
    t => {
        const action = {
            type: AUTH_STATUS_UPDATED,
            authenticated: false
        };
        const stateBefore = {isAuthenticated: true};

        deepFreeze(stateBefore);

        t.false(auth(stateBefore, action).isAuthenticated);
    }
);

test(
    'ready defaults to false',
    t => {
        const action = {type: 'TEST'};

        t.false(auth(undefined, action).ready);
    }
);

test(
    'ready can become true',
    t => {
        const action = {
            type: AUTH_STATUS_READY
        };
        const stateBefore = {ready: false};

        deepFreeze(stateBefore);

        t.true(auth(stateBefore, action).ready);
    }
);

test(
    'ready stays true',
    t => {
        const action = {
            type: AUTH_STATUS_READY
        };
        const stateBefore = {ready: true};

        deepFreeze(stateBefore);

        t.true(auth(stateBefore, action).ready);
    }
);

test(
    'ready ignores extra action attributes',
    t => {
        const action = {
            type: AUTH_STATUS_READY,
            foo: 'bar'
        };
        const stateBefore = {ready: false};

        deepFreeze(stateBefore);

        t.true(auth(stateBefore, action).ready);
    }
);