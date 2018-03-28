import uuid from 'uuid';
import database from '../firebase/firebase';

// ACTIVATE_DOG
export const activateDog = ( id ) => ({
    type: "ACTIVATE_DOG",
    id
});


// ADD_DOG
export const addDog = ({ name, breed = "unknown", isActive = false, skills = []}) => ({
    type: "ADD_DOG",
    dog: {
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