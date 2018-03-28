export default (dogs) => {
    for (let i=0; i<dogs.length; i++) {
        if (dogs[i].isActive) {
            return dogs[i];
        }
    }
};