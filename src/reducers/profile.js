const defaultProfileReducerState = {};

export default (state = defaultProfileReducerState, action) => {
    switch (action.type) {
        case "UPDATE_PROFILE":
            return {
                ...action.profileInfo
            };
        case "SET_PROFILE":
            return action.profileInfo
        default:
            return state;
    }
}