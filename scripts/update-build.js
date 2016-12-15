const admin = require('firebase-admin');

const target = process.env['DEPLOY_TARGET'];
const key = require('../config/firebase/service-keys/' + target + '.json');
const config = require('../config/firebase/' + target);

const commit = process.env['BUILD_COMMIT'];
const timestamp = parseInt(process.env['BUILD_TIMESTAMP']);
const version = require('../package').version;

const app = admin.initializeApp({
    credential: admin.credential.cert(key),
    databaseURL: JSON.parse(config['FIREBASE_DATBASE_URL']),
    databaseAuthVariableOverride: {
        uid: "service-worker"
    }
});

admin.database().ref('/build').set({
    commit,
    timestamp,
    version
}).then(() => {
    app.delete();
});