import { TEACHER_UPDATED } from '../types/teacher';
import { getTeacherRef } from '../../services/teacher';

export const teacherUpdated = (payload) => {
    return {
        type: TEACHER_UPDATED,
        payload
    };
};

export const subscribeToTeacher = (uid) => {
    return (dispatch) => {
        const ref = getTeacherRef(uid);
        ref.on('value', (snapshot) => {
            dispatch(teacherUpdated(snapshot.val()))
        });
    };
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