import React from 'react';
import { connect } from 'react-redux';
import { startLoginWithEmail, startSignUp } from '../actions/auth';

export class AuthModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            error: null,
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
    loginWithEmail = () => {
        if (this.state.email && this.state.password) {
            this.props.startLoginWithEmail(this.state.email, this.state.password).then((error) => {
                if (error) {
                    this.setState(() => ({ error: error }));
                }
            });   
        } else {
            this.setState(() => ({ error: "The email and/or password is invalid." }))
        }
    }
    signupWithEmail = () => {
        if (this.state.email && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.state.password)) {
            this.props.startSignUp(this.state.email, this.state.password);
        } else {
            this.setState(() => ({ error: "The email and/or password is invalid. Password must contain eight characters, at least one number, and at least one letter." }))
        }
    }
    render() {
        return (
            <div className="auth-modal">
                <div className="auth-modal__box">
                    {(this.state.error && typeof this.state.error === "string")&& <p className='auth-modal__error'>{this.state.error}</p>}
                    <p className='auth-modal__exit' onClick={this.props.closeLoginModal}>Nevermind.</p>
                    <input 
                        className="auth-modal__email"
                        onChange={this.onEmailChange}
                        placeholder='Email'
                        type='email'
                        value={this.state.email}
                        required
                    />
                    <input 
                        className="auth-modal__password"
                        onChange={this.onPasswordChange}
                        placeholder='Password'
                        type='password'
                        value={this.state.password}
                        required
                    />
                    <button onClick={this.signupWithEmail} className="auth-modal__button--signUp">Sign Up</button>
                    <button onClick={this.loginWithEmail} className="auth-modal__button--signIn">Login</button>
                </div>
            </div>
        )
    };
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})

const mapDispatchToProps = (dispatch) => ({
    startSignUp: (email, password) => dispatch(startSignUp(email, password)),
    startLoginWithEmail: (email, password) => dispatch(startLoginWithEmail(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);