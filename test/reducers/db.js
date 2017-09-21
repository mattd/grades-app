import test from 'ava';
import deepFreeze from 'deep-freeze';

import db from 'reducers/db';
import {
    DB_LISTENER_ADDED,
    DB_LISTENER_REMOVED,
    DB_LISTENERS_FLUSH
} from 'actions/types/db';

test(
    'default state is empty',
    t => {
        const action = {
            type: 'TEST'
        };

        t.deepEqual(db(undefined, action), {});
    }
);

test(
    'listeners can be added',
    t => {
        const action = {
            type: DB_LISTENER_ADDED,
            path: '/foobar'
        };
        const stateBefore = deepFreeze({});

        t.deepEqual(db(stateBefore, action), {'/foobar': true});
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

        deepFreeze(stateBefore);

        t.deepEqual(db(stateBefore, action), {'/foobar': false});
    }
);

test(
    'listeners can be flushed',
    t => {
        const action = {
            type: DB_LISTENERS_FLUSH
        };
        const stateBefore = {'/foo': true, '/bar': false};

        deepFreeze(stateBefore);

        t.deepEqual(db(stateBefore, action), {});
    }
);