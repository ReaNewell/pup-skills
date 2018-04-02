import { activateDog, addDog, editDog, removeDog, setDogs } from "../../actions/dogs";
import dogs from '../fixtures/dogs';

test('should activate dog in action object', () => {
    const action = activateDog( dogs[0].id );
    expect(action).toEqual({
        type: "ACTIVATE_DOG",
        id: dogs[0].id
    })
});

test('should add dog in action object', () => {
    const action = addDog(dogs[0]);
    expect(action).toEqual({
        type: "ADD_DOG",
        dog: dogs[0]
    })
});

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

test("should remove dog in action object", () => {
    const action = removeDog(dogs[0].id);
    expect(action).toEqual({
        type: "REMOVE_DOG",
        id: dogs[0].id
    })
});

test('should set dogs in action object', () => {
    const action = setDogs(dogs);
    expect(action).toEqual({
        type: "SET_DOGS",
        dogs
    })
});