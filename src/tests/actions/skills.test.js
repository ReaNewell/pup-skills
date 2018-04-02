import { addSkill, changeCategory, removeSkill } from '../../actions/skills';
import dogs from '../fixtures/dogs'
import skills from '../fixtures/skills';

test('should add skill to action object', () => {
    const action = addSkill(skills[1]);
    expect(action).toEqual({
        type: "ADD_SKILL",
        skill: skills[1]
    });
});

test('should change category in action object', () => {
    const action = changeCategory(dogs[1].skills[0].id, dogs[1].skills[0].dogId, "In Progress");
    expect(action).toEqual({
        type: "CHANGE_CATEGORY",
        id: dogs[1].skills[0].id,
        dogId: dogs[1].skills[0].dogId,
        category: "In Progress"
    });
});

test('should remove skill in action object', () => {
    const action = removeSkill(2);
    expect(action).toEqual({
        type: "REMOVE_SKILL",
        id: 2
    });
});