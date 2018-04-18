const defaultProfileReducerState = {};

const updateColors = (theme) => {
    let hue;
    switch (theme) {
        case 'default':
            hue = 112;
            break;
        case 'blue':
            hue = 204;
            break;
        case 'orange':
            hue = 26;
            break;
        case 'pink':
            hue = 332;
            break;
        default:
            hue = 112;
    };
    document.documentElement.style.setProperty('--main-color',                  `hsl(${hue}, 65%, 75%)`);
    document.documentElement.style.setProperty('--main-color--lighten-5',       `hsl(${hue}, 65%, 80%)`);
    document.documentElement.style.setProperty('--main-color--lighten-10',      `hsl(${hue}, 65%, 85%)`);
    document.documentElement.style.setProperty('--main-color--lighten-15',      `hsl(${hue}, 65%, 90%)`);
    document.documentElement.style.setProperty('--main-color--lighten-20',      `hsl(${hue}, 65%, 95%)`);
    document.documentElement.style.setProperty('--main-color--lighten-25',      `hsl(${hue}, 65%, 100%)`);
    document.documentElement.style.setProperty('--secondary-color',             `hsl(${hue}, 44%, 59%)`);
    document.documentElement.style.setProperty('--secondary-color--lighten-10', `hsl(${hue}, 44%, 69%)`);
    document.documentElement.style.setProperty('--secondary-color--lighten-15', `hsl(${hue}, 44%, 74%)`);
    document.documentElement.style.setProperty('--secondary-color--darken-15', `hsl(${hue}, 44%, 44%)`);
};

export default (state = defaultProfileReducerState, action) => {
    switch (action.type) {
        case "UPDATE_PROFILE":
            return {
                ...action.profileInfo
            };
        case "UPDATE_THEME":
            updateColors(action.theme);
            return {
                ...state,
                theme: action.theme
            };
        case "SET_PROFILE":
            updateColors(action.profileInfo.theme);
            return action.profileInfo
        default:
            return state;
    }
}