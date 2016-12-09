import * as R from 'ramda';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { bindActionCreators } from 'redux';

import { respondToAuthChange } from '../actions/creators/auth';

// TODO: Find a better place to put these order functions.
export const nextOrder = (obj) => {
    return (
        (
            R.last(
                R.sort(
                    R.min,
                    R.pluck('order')(R.values(obj))
                )
            ) + 1
        ) || 0
    );
};

export const sortObject = (obj) => {
    return (
        R.sortBy(
            R.prop('order')
        )(R.values(obj))
    );
};

const start = (store) => {
    const config = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATBASE_URL,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
    };

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(
        bindActionCreators(respondToAuthChange, store.dispatch)
    );

    if (process.env['NODE_ENV'] !== 'production') window.store = store;

    return store;
};

export { start };