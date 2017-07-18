import test from 'ava';
import deepFreeze from 'deep-freeze';

import ui, { initialState } from 'reducers/ui';
import { UI_TOGGLE, UI_SET, UI_RESET } from 'actions/types/ui';

test(
    'drawerOpen defaults to false',
    t => {
        const action = {type: 'TEST'};

        t.false(ui(undefined, action).drawerOpen);
    }
);

test(
    'addingTerm defaults to false',
    t => {
        const action = {type: 'TEST'};

        t.false(ui(undefined, action).addingTerm);
    }
);

test(
    'toggling can make false values true',
    t => {
        const action = {
            type: UI_TOGGLE,
            key: 'spamEggs'
        };
        const stateBefore = {spamEggs: false};

        deepFreeze(stateBefore);

        t.true(ui(stateBefore, action).spamEggs);
    }
);

test(
    'toggling can make true values false',
    t => {
        const action = {
            type: UI_TOGGLE,
            key: 'spamEggs'
        };
        const stateBefore = {spamEggs: true};

        deepFreeze(stateBefore);

        t.false(ui(stateBefore, action).spamEggs);
    }
);

test(
    'setting can change values',
    t => {
        const action = {
            type: UI_SET,
            key: 'spamEggs',
            value: 'bar'
        };
        const stateBefore = {spamEggs: 'foo'};

        deepFreeze(stateBefore);

        t.deepEqual(ui(stateBefore, action), {spamEggs: 'bar'});
    }
);

test(
    'resetting returns state to initial values',
    t => {
        const action = {
            type: UI_RESET
        };

        t.deepEqual(ui({}, action), initialState);
    }
);