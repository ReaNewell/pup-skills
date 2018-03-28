import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import dogsReducer from '../reducers/dogs';
import profileInfoReducer from '../reducers/profile';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            dogs: dogsReducer,
            profileInfo: profileInfoReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
