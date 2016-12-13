import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { bindActionCreators } from 'redux';

import { respondToAuthChange } from '../actions/creators/auth';
import { isDev } from '../utils/environment';

export const start = (store) => {
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

    if (isDev()) window.store = store;

    return store;
};