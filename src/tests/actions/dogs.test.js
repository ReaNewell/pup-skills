import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { activateDog, addDog, editDog, removeDog, setDogs, startAddDog, startEditDog, startRemoveDog } from "../../actions/dogs";
import dogs from '../fixtures/dogs';
import database from '../../firebase/firebase';

const uid = 'this is my test uid';
const defaultAuthState = { auth: {uid} };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const dogsData = {};
    dogs.forEach(({ id, name, breed, isActive, skills }) => {
        dogsData[id] = { name, breed, isActive, skills };
    });
    database.ref(`users/${uid}/dogs`).set(dogsData).then(() => done());
})

// ACTIVATE DOG
test('should activate dog in action object', () => {
    const action = activateDog( dogs[0].id );
    expect(action).toEqual({
        type: "ACTIVATE_DOG",
        id: dogs[0].id
    })
});

// ADD DOG
test('should add dog in action object', () => {
    const action = addDog(dogs[0]);
    expect(action).toEqual({
        type: "ADD_DOG",
        dog: dogs[0]
    })
});
test('should add dog to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const dogData = {
        name: 'Yolanda',
        breed: 'Yorkie',
        isActive: false,
        skills: []
    };

    store.dispatch(startAddDog(dogData)).then(() => {
        expect(action[0]).toEqual({
            type: 'ADD_DOG',
            dog: {
                id: expect.any(String),
                ...dogData
            }
        });
        return database.ref(`users/${uid}/dogs/${actions[0].dog.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(dogData);
        done();
    }).catch(done);
});


// EDIT DOG
test("should edit dog in action object", () => {
    const action = editDog(dogs[0].id, {breed: "Chihuahua"});
    expect(action).toEqual({
        type: "EDIT_DOG",
        id: dogs[0].id,
        updates: {
            breed: "Chihuahua"
        }
    })
});
test('should edit dog object in database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const updates = {
        breed: 'Pitbull'
    }

    store.dispatch(startEditDog(dogs[0].id, updates)).then(() => {
        expect(action[0]).toEqual({
            type: 'EDIT_DOG',
            id: dogs[0].id,
            updates
        })
        return database.ref(`users/${uid}/dogs/${actions[0].dog.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual({
            ...dogs[0],
            updates
        });
        done();
    }).catch(done);
})


//REMOVE DOG
test("should remove dog in action object", () => {
    const action = removeDog(dogs[0].id);
    expect(action).toEqual({
        type: "REMOVE_DOG",
        id: dogs[0].id
    });
});
test('should remove dog object from database and store', (done) => {
    const store = createMockStore(defaultAuthState);

    store.dispatch(startRemoveDog(dogs[1].id)).then(() => {
        expect(action[0]).toEqual({
            type: 'REMOVE_DOG',
            id: dogs[1].id
        });
        return database.ref(`users/${uid}/dogs/${actions[0].dog.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    }).catch(done);;
});


// SET DOGS
test('should set dogs in action object', () => {
    const action = setDogs(dogs);
    expect(action).toEqual({
        type: "SET_DOGS",
        dogs
    })
});