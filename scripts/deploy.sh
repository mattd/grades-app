#!/bin/bash
source scripts/set-timestamp.sh
source scripts/set-commit.sh
npm run build:$1
if [ -z "$FIREBASE_TOKEN" ]; then
    firebase deploy -P $1
else
    firebase deploy --token $FIREBASE_TOKEN -P $1
fi
node scripts/update-build