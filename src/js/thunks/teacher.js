import firebase from 'firebase';

import { teacherUpdated } from '../action-creators/teacher';

const getTeacherRef = (uid) => {
    return firebase.database().ref('/teachers/' + uid);
};

const createTeacher = (profile) => {
    return (dispatch) => {
    };
};

const subscribeToTeacher = (uid) => {
    return (dispatch) => {
        const ref = getTeacherRef(uid);
        ref.on('value', (snapshot) => {
            dispatch(
                teacherUpdated(snapshot.val())
            )
        });
    };
};

const subscribeToOrCreateTeacher = (uid) => {
    return (dispatch, getState) => {
        const ref = getTeacherRef(uid);
        ref.once('value').then(snapshot => {
            const teacher = snapshot.val();
            const profile = getState().profile;
            if (teacher) {
                dispatch(subscribeToTeacher(uid));
            } else {
                dispatch(createTeacher(profile));
            }
        });
    };
};

export { createTeacher, subscribeToTeacher, subscribeToOrCreateTeacher };