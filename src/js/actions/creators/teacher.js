import { TEACHER_UPDATED, TEACHER_FLUSH } from '../types/teacher';
import { getTeacherRef, getTeacherPath } from '../../services/teacher';
import { dbListenerAdded } from './db';

export const teacherUpdated = (payload) => {
    return {
        type: TEACHER_UPDATED,
        payload
    };
};

export const flushTeacher = () => {
    return {
        type: TEACHER_FLUSH
    };
};

export const subscribeToTeacher = (uid) => {
    return (dispatch) => {
        const ref = getTeacherRef(uid);
        ref.on('value', (snapshot) => {
            dispatch(teacherUpdated(snapshot.val()))
        });
        dispatch(dbListenerAdded(getTeacherPath(uid)));
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