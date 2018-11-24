import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import { startLogout } from '../actions/auth';

export class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginModalIsOpen: false,
        }
    }
    closeLoginModal = () => {
        this.setState(() => ({ loginModalIsOpen: false }));
    }
    openLoginModal = () => {
        this.setState(() => ({ loginModalIsOpen: true }));
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
                    this.state.loginModalIsOpen && <AuthModal closeLoginModal={this.closeLoginModal}/>
                }
            </header>
        )
    }
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});
const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);