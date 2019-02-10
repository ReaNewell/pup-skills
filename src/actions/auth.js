import { firebase } from '../firebase/firebase';

// LOGIN
export const login = (uid) => ({
    type: "LOGIN",
    uid
});
export const startLoginWithEmail = (email, password) => {
    return () => {
        return firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
            return error.message;
        })
    };
};

// LOGOUT
export const logout = () => ({
    type: "LOGOUT"
})
export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};


// SIGNUP
export const signup = () => ({
    type: "SIGNUP"
});
export const startSignUp = (email, password) => {
    return () => {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            return firebase.auth().signInWithEmailAndPassword(email, password);
        });
    }
};