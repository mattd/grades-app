const admin = require('firebase-admin');

const target = process.env['DEPLOY_TARGET'];
const key = require('../config/firebase/service-keys/' + target + '.json');
const config = require('../config/firebase/' + target);

const commit = process.argv[2].slice(0, 7);
const timestamp = process.env['BUILD_TIMESTAMP'];
const version = require('../package').version;

const app = admin.initializeApp({
    credential: admin.credential.cert(key),
    databaseURL: JSON.parse(config['FIREBASE_DATBASE_URL']),
    databaseAuthVariableOverride: {
        uid: "service-worker"
    }
});

admin.database().ref('/build').set({
    commit: commit,
    timestamp: timestamp,
    version: version
}).then(() => {
    app.delete();
});