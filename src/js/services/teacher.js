import firebase from 'firebase';

export const getTeacherPath = (uid) => {
    return '/teachers/' + uid;
};

export const getTeacherRef = (uid) => {
    return firebase.database().ref(getTeacherPath(uid));
};