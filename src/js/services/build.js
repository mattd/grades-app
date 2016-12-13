import firebase from 'firebase';

export const getBuildPath = () => {
    return '/build';
};

export const getBuildRef = () => {
    return firebase.database().ref(getBuildPath());
};