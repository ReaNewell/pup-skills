import { addSkill, changeCategory, removeSkill } from '../../actions/skills';
import skills from '../fixtures/skills';

test('should add skill to action object', () => {
    const action = addSkill(skills[1]);
    expect(action).toEqual({
        type: "ADD_SKILL",
        skill: skills[1]
    });
});


test('should change category in action object', () => {
    const action = changeCategory(skills[0].id, 'In Progress');
    expect(action).toEqual({
        type: "CHANGE_CATEGORY",
        id: skills[0].id,
        category: "In Progress"
    });
});


test('should remove skill action object', () => {
    const action = removeSkill(2);
    expect(action).toEqual({
        type: "REMOVE_SKILL",
        id: 2
    });
});