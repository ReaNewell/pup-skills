import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
    <div className="login-page">
        <div className="login-page__box">
            <h2 className="login-page__title">Pup Skills</h2>
            <button 
                onClick={startLogin} 
                className="login-page__button"
            >
                Login with Google
            </button>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});
export default connect(undefined, mapDispatchToProps)(LoginPage);