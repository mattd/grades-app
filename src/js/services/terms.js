import firebase from 'firebase';

import { getTeacherPath } from './teacher';

export const getTermsPath = (uid) => {
    return getTeacherPath(uid) + '/terms'
};

export const getTermsRef = (uid) => {
    return firebase.database().ref(getTermsPath(uid));
};