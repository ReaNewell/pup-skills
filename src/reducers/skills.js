const defaultReducerState = [];
export default (state = defaultReducerState, action) => {
    switch (action.type) {
        case 'ADD_SKILL':
            return [
                ...state,
                action.skill
            ]
        case 'CHANGE_CATEGORY':
            let newCategory = '';
            if (action.category === 'In Progress') {
                newCategory = 'Completed';
            } else {
                newCategory = 'In Progress'
            }
            return state.map((skill) => {
                if (skill.id === action.id) {
                    return {
                        ...skill,
                        category: newCategory
                    }
                } else {
                    return skill;
                }
            });
        case 'REMOVE_SKILL':
            return state.filter(({ id }) => id !== action.id);
        default:
            return state;
    }
};