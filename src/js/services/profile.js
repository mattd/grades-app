import firebase from 'firebase';

import { getTeacherPath } from './teacher';

export const getProfilePath = (uid) => {
    return getTeacherPath(uid) + '/profile'
};

export const getProfileRef = (uid) => {
    return firebase.database().ref(getProfilePath(uid));
};