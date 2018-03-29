import uuid from 'uuid';
import database from '../firebase/firebase';

// ACTIVATE_DOG
export const activateDog = ( id ) => ({
    type: "ACTIVATE_DOG",
    id
});


// ADD_DOG
export const addDog = ({id, name, breed = "unknown", isActive = false, skills = []}) => ({
    type: "ADD_DOG",
    dog: {
        id,
        name,
        breed,
        isActive,
        skills
    }
});
export const startAddDog = (dogData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            name = "",
            breed = "",
            isActive = false,
            skills = []
        } = dogData;
        const dog = { name, breed, isActive, skills };

        return database.ref(`users/${uid}/dogs`).push(dog).then((ref) => {
            dispatch(addDog({
                id: ref.key,
                ...dog
            }))
        });
    };
};


// EDIT_DOG
export const editDog = (id, updates) => ({
    type: "EDIT_DOG",
    id,
    updates
});
export const startEditDog = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/dogs/${id}`).update({
            ...updates
        }).then(() => {
            dispatch(editDog(id, updates));
        })
    }
};


// REMOVE_DOG
export const removeDog = (id) => ({
    type: "REMOVE_DOG",
    id
});
export const startRemoveDog = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/dogs/${id}`).remove().then(() => {
            dispatch(removeDog(id));
        });
    };
};


// SET_DOGS
export const setDogs = (dogs) => ({
    type: "SET_DOGS",
    dogs
});
export const startSetDogs = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/dogs`).once('value').then((snapshot) => {
            const dogs = [];

            snapshot.forEach((childSnapshot) => {
                dogs.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setDogs(dogs));
        });
    };
};