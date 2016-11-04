require('../scss/style.scss');

const firebase = require('firebase/app');
require('firebase/auth');

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATBASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

const fb = firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/plus.login');

firebase.auth().signInWithPopup(provider).then(function(result) {
    console.log('Token:', result.credential.accessToken);
    console.log('User:', result.user);
}).catch(function(error) {
    console.log(error);
});