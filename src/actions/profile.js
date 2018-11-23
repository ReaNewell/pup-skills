import database from '../firebase/firebase';
import { storage } from '../firebase/firebase';
import { startLogout } from './auth';

// REMOVE_PROFILE
export const startRemoveProfile = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}`).remove().then(() => {
            dispatch(startLogout());
        }).then(() => {
            return storage.ref(`/dogPictures/${uid}`).delete();
        });
    }
}


// UPDATE_PROFILE
export const updateProfile = (profileInfo) => ({
    type: "UPDATE_PROFILE",
    profileInfo
});
export const startUpdateProfile = (profileInfo) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            profileName = ""
        } = profileInfo;
        const profile = { profileName };

        return database.ref(`users/${uid}/profileInfo`).update(profile).then(() => {
            dispatch(updateProfile(profileInfo));
        });
    };
};


// UPDATE_THEME
export const updateTheme = (theme = 'default') => ({
    type: "UPDATE_THEME",
    theme
});
export const startUpdateTheme = (newTheme) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/profileInfo`).update({ theme: newTheme }).then(() => {
            dispatch(updateTheme(newTheme));
        });
    };
};


// SET_PROFILE
export const setProfile = (profileInfo) => ({
    type: "SET_PROFILE",
    profileInfo
});
export const startSetProfile = (profileInfo) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/profileInfo`).once('value').then((snapshot) => {
            const profileInfo = { ...snapshot.val() };

            dispatch(setProfile(profileInfo));
        })
    }
};