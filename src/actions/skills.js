import uuid from 'uuid';

// ADD_SKILL
export const addSkill = ({ name, category = 'In Progress' }) => ({
    type: "ADD_SKILL",
    skill: {
        id: uuid(),
        name,
        category
    }
});

// CHANGE_CATEGORY
export const changeCategory = (id, category) => ({
    type: "CHANGE_CATEGORY",
    id,
    category
});

// REMOVE_SKILL
export const removeSkill = (id) => ({
    type: "REMOVE_SKILL",
    id
});