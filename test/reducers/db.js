import test from 'ava';
import deepFreeze from 'deep-freeze';

import db from 'reducers/db';
import {
    DB_LISTENER_ADDED,
    DB_LISTENER_REMOVED,
    DB_LISTENER_FLUSH
} from 'actions/types/db';

test(
    'initial state is empty',
    t => {
        const action = {
            type: 'TEST'
        };
        const stateBefore = {};

        deepFreeze(stateBefore);

        db(undefined, action);
        t.deepEqual(stateBefore, {});
    }
);

test(
    'listeners can be added',
    t => {
        const action = {
            type: DB_LISTENER_ADDED,
            path: '/foobar'
        };
        const stateBefore = {};
        const stateAfter = {'/foobar': true};

        deepFreeze(stateBefore);

        db(stateBefore, action);
        t.deepEqual(stateAfter, {'/foobar': true});
    }
);

test(
    'listeners can be removed',
    t => {
        const action = {
            type: DB_LISTENER_REMOVED,
            path: '/foobar'
        };
        const stateBefore = {'/foobar': true};
        const stateAfter = {'/foobar': false};

        deepFreeze(stateBefore);

        db(stateBefore, action);
        t.deepEqual(stateAfter, {'/foobar': false});
    }
);

test(
    'listeners can be flushed',
    t => {
        const action = {
            type: DB_LISTENER_FLUSH
        };
        const stateBefore = {'/foo': true, '/bar': false};
        const stateAfter = {};

        deepFreeze(stateBefore);

        db(stateBefore, action);
        t.deepEqual(stateAfter, {});
    }
);