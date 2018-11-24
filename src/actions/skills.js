import database from '../firebase/firebase';

// ADD_SKILL
export const addSkill = (skill) => ({
    type: "ADD_SKILL",
    skill
});
export const startAddSkill = (skillData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            name = "",
            category = "In Progress",
            dogId = "",
            description = ""
        } = skillData;
        const skill = { dogId, category, name, description };

        return database.ref(`users/${uid}/dogs/${skill.dogId}/skills`).push(skill).then((ref) => {
            dispatch(addSkill({
                id: ref.key,
                ...skill
            }))
        });
    };
};

// CHANGE_CATEGORY
export const changeCategory = (id, dogId, category) => ({
    type: "CHANGE_CATEGORY",
    id,
    dogId,
    category
});
export const startChangeCategory = (id, dogId, category) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        let newCategory = "In Progress";
        if (category === newCategory) {
            newCategory = "Completed";
        }
        return database.ref(`users/${uid}/dogs/${dogId}/skills/${id}`).update({
            category: newCategory
        }).then(() => {
            dispatch(changeCategory(id, dogId, category));
        })
    }
};


// REMOVE_SKILL
export const removeSkill = (id, dogId) => ({
    type: "REMOVE_SKILL",
    id,
    dogId
});
export const startRemoveSkill = (id, dogId) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/dogs/${dogId}/skills/${id}`).remove().then(() => {
            dispatch(removeSkill(id, dogId));
        });
    };
};