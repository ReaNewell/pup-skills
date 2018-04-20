import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
    type: "LOGIN",
    uid
});
export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};
export const startLoginWithEmail = (email, password) => {
    return () => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };
};

export const logout = () => ({
    type: "LOGOUT"
})
export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};

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