import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout, startLogin, startLoginWithEmail, startSignUp } from '../actions/auth';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            loginModalIsOpen: false,
            password: ""
        }
    }
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    }
    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password }));
    }
    openLoginModal = () => {
        this.setState(() => ({ loginModalIsOpen: true }));
    }
    loginWithEmail = () => {
        if (this.state.email && this.state.password) {
            this.props.startLoginWithEmail(this.state.email, this.state.password);
        }
    }
    signupWithEmail = () => {
        if (this.state.email && this.state.password) {
            this.props.startSignUp(this.state.email, this.state.password);
        }
    }
    render() {
        return (
            <header className="header">
                <div className="content-container"> 
                    <div className="header__content">
                        <Link to='/dashboard' className="header__title">
                            <h1 className="header__title">Pup<span>Skills</span></h1>
                        </Link>
                        <div>
                            {this.props.isAuthenticated ? (
                                <button onClick={this.props.startLogout} className="header__button">Logout</button>
                            ) : (
                                <button onClick={this.openLoginModal} className="header__button">Sign In</button>
                            )}
                        </div>
                    </div>
                </div>
                {
                    this.state.loginModalIsOpen && 
                    <div className="login-modal">
                        <div className="login-modal__box">
                            <input 
                                className="login-modal__email"
                                onChange={this.onEmailChange}
                                placeholder='Email'
                                type='text'
                                value={this.state.email}
                            />
                            <input 
                                className="login-modal__password"
                                onChange={this.onPasswordChange}
                                placeholder='Password'
                                type='text'
                                value={this.state.password}
                            />
                            <button onClick={this.signupWithEmail} className="login-modal__button--signUp">Sign Up</button>
                            <button onClick={this.loginWithEmail} className="login-modal__button--signIn">Login</button>
                            <button onClick={this.props.startLogin} className="login-modal__button--signInGoogle">Sign In with Google</button>
                        </div>
                    </div>
                }
            </header>
        )
    }
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    startLogin: () => dispatch(startLogin()),
    startSignUp: (email, password) => dispatch(startSignUp(email, password)),
    startLoginWithEmail: (email, password) => dispatch(startLoginWithEmail(email, password))
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);