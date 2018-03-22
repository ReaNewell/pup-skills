export default (skills, category) => {
    return skills.filter(skill => skill.category == category).sort((a, b) => {
        return a < b ? 1 : -1;
    });
};