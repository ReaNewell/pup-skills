import uuid from 'uuid';
import database from '../firebase/firebase';
import { firebase, storage } from '../firebase/firebase';

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
export const startAddDog = (dogData = {}, picture) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        let currentDog;
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
            currentDog = ref.key
        }).then(() => {
            if (picture) {
                const fileName = picture.name;
                const storageRef = storage.ref(`/dogPictures/${uid}/${fileName}`);
                const uploadTask = storageRef.put(picture);
                let downloadURL;

                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
                }, function(error) {

                }, function() {
                    // Upload completed successfully, now we can get the download URL
                    console.log('Upload complete.')
                    downloadURL = uploadTask.snapshot.downloadURL;
                    return database.ref(`users/${uid}/dogs/${currentDog}`).update({ 
                        pupPicture: downloadURL,
                        pupPictureName: fileName
                    })
                });
            }
        });
    };
};


// EDIT_DOG
export const editDog = (id, updates) => ({
    type: "EDIT_DOG",
    id,
    updates
});
export const startEditDog = (id, updates, currentPicture, picture) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const currentPupPicture = currentPicture;
        return database.ref(`users/${uid}/dogs/${id}`).update({
            ...updates
        }).then(() => {
            dispatch(editDog(id, updates));
        }).then(() => {
            if (picture) {
                const fileName = picture.name;
                const storageRef = storage.ref(`/dogPictures/${uid}/${fileName}`);
                const uploadTask = storageRef.put(picture);
                let downloadURL;

                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
                }, function(error) {

                }, function() {
                    // Upload completed successfully, now we can get the download URL
                    console.log('Upload complete.')
                    downloadURL = uploadTask.snapshot.downloadURL;
                    return database.ref(`users/${uid}/dogs/${id}`).update({ 
                        pupPicture: downloadURL,
                        pupPictureName: fileName
                    }).then(() => {
                        return storage.ref(`/dogPictures/${uid}/${currentPupPicture}`).delete();
                    });
                });
            }
        });
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

// UPDATE_PICTURE
export const startUpdatePicture = (picture, dogId) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        const fileName = picture.name;
        const storageRef = storage.ref(`/dogPictures/${uid}/${fileName}`);
        const uploadTask = storageRef.put(picture);
        let downloadURL;

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
        }, function(error) {

        }, function() {
            // Upload completed successfully, now we can get the download URL
            console.log('Upload complete.')
            downloadURL = uploadTask.snapshot.downloadURL;
            return database.ref(`users/${uid}/dogs/${dogId}`).update({ 
                pupPicture: downloadURL,
                pupPictureName: fileName
            })
        });
    }  
};