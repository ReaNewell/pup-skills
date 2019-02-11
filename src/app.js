import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'react-dates/lib/css/_datepicker.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { firebase } from'./firebase/firebase';
import LoadingPage from './components/LoadingPage';

import { login, logout, startLoginWithEmail } from './actions/auth';
import { startSetDogs } from './actions/dogs';
import { startSetProfile } from './actions/profile';

const store = configureStore();
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

const getCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

console.log(getCookie("email"));
let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;        
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetProfile()).then(() => {
            store.dispatch(startSetDogs())
        })
        .then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });
    } else if (document.cookie) {
        store.dispatch(startLoginWithEmail(getCookie("email"), getCookie("password"))).then(() => {
            renderApp();
        });
    } else {
        store.dispatch(logout());
        renderApp();
    }
});