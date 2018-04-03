const defaultDogsReducerState = [];

export default (state = defaultDogsReducerState, action) => {
    switch (action.type) {
        case "ACTIVATE_DOG":
            return state.map((dog) => {
                if (dog.id === action.id) {
                    return {
                        ...dog,
                        isActive: true
                    }
                } else {
                    return {
                        ...dog,
                        isActive: false
                    };
                }
            });
        case "ADD_DOG":
            // Creates an array of the old state objects, mutates each dog to be inactive.
            const oldState = state.map((dog) => { 
                return { 
                    ...dog, 
                    isActive: false 
                }
            });
            // Adds dog to old state, new dog is active.
            return oldState.concat([{ ...action.dog }]);
        case "EDIT_DOG":
            return state.map((dog) => {
                if (dog.id === action.id) {
                    return {
                        ...dog,
                        ...action.updates
                    }
                } else {
                    return dog
                }
            });
        case "REMOVE_DOG":
            return state.filter((dog) => dog.id !== action.id);
        case "SET_DOGS":
            return action.dogs.map((dog) => {
                let skills = [];
                for (var skill in dog.skills) {
                    skills.push({
                        ...dog.skills[skill],
                        id: skill
                    });
                }
                return {
                    ...dog,
                    skills
                }
            });

        case 'ADD_SKILL':
            return state.map((dog) => {
                // Sets up skills array for current dog.
                let skills = [];
                if (dog.skills) {
                    for (let i=0; i<dog.skills.length; i++) {
                        skills[i] = dog.skills[i];
                    }
                }
                // Adds skill to active dog's skill array.
                return dog.id === action.skill.dogId ? (
                    {
                        ...dog,
                        skills: [
                            ...skills,
                            action.skill
                        ]
                    }
                ) : (
                    dog
                )
            });
        case 'CHANGE_CATEGORY':
            // Sets new category based on old category.
            let newCategory = '';
            action.category === 'In Progress' ? newCategory = 'Completed' : newCategory = 'In Progress';
            // Sets category property of skill to the new category.
            return state.map((dog) => {
                if (dog.id === action.dogId) {
                    return {
                        ...dog,
                        skills: dog.skills.map((skill) => {
                            if (skill.id === action.id) {
                                return {
                                    ...skill,
                                    category: newCategory
                                } 
                            } else {
                                return skill;       
                            }
                        })
                    }
                } else {
                    return dog;
                }
            });
        case 'REMOVE_SKILL':
            return state.map((dog) => {
                if (dog.id === action.dogId) {
                    return {
                        ...dog,
                        skills: dog.skills.filter(( skill ) => skill.id !== action.id)
                    };
                } else {
                    return dog;
                }
            });

        default:
            return state;
    }
};