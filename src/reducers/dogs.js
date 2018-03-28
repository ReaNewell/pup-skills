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
            const oldState = state.map((dog) => { 
                return { 
                    ...dog, 
                    isActive: false 
                }
            });
            return oldState.concat([{ ...action.dog }]);
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
                let skills = [];
                if (dog.skills) {
                    for (let i=0; i<dog.skills.length; i++) {
                        skills[i] = dog.skills[i];
                    }
                }
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
            let newCategory = '';
            if (action.category === 'In Progress') {
                newCategory = 'Completed';
            } else {
                newCategory = 'In Progress'
            }
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