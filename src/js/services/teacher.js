import firebase from 'firebase';

export const getTeacherRef = (uid) => {
    return firebase.database().ref('/teachers/' + uid);
};