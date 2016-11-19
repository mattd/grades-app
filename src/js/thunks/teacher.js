import firebase from 'firebase';

import { teacherUpdated } from '../action-creators/teacher';

const getTeacherRef = (uid) => {
    return firebase.database().ref('/teachers/' + uid);
};

export const createAndSubscribeToTeacher = (profile) => {
    return (dispatch, getState) => {
        const ref = getTeacherRef(profile.uid);
        const { teacher } = getState();
        ref.set({
            ...teacher,
            ...profile
        });
        dispatch(subscribeToTeacher(profile.uid));
    };
};

export const subscribeToTeacher = (uid) => {
    return (dispatch) => {
        const ref = getTeacherRef(uid);
        ref.on('value', (snapshot) => {
            dispatch(
                teacherUpdated(snapshot.val())
            )
        });
    };
};

export const subscribeToOrCreateTeacher = (uid) => {
    return (dispatch, getState) => {
        const ref = getTeacherRef(uid);
        ref.once('value').then(snapshot => {
            const teacher = snapshot.val();
            const profile = getState().profile;
            if (teacher) {
                dispatch(subscribeToTeacher(uid));
            } else {
                dispatch(createAndSubscribeToTeacher(profile));
            }
        });
    };
};