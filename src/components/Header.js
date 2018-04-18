import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout, startLogin } from '../actions/auth';

export const Header = ({ startLogout, startLogin, isAuthenticated }) => (
    <header className="header">
        <div className="content-container"> 
            <div className="header__content">
                <Link to='/dashboard' className="header__title">
                    <h1 className="header__title">Pup<span>Skills</span></h1>
                </Link>
                <div>
                    <Link to='/help' className="header__link">Help</Link>
                    {isAuthenticated ? <button onClick={startLogout} className="header__button">Logout</button> : <button onClick={startLogin} className="header__button">Sign In</button>}
                </div>
            </div>
        </div>
    </header>
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    startLogin: () => dispatch(startLogin())
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);