import firebase from 'firebase/app';
import * as _auth from 'firebase/auth';
import * as _database from 'firebase/database';

const start = () => {
    const config = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATBASE_URL,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
    };
    const fb = firebase.initializeApp(config);

    return fb;
};

export default { start };