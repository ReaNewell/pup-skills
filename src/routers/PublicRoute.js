import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PublicRoute = ({ isAuthenticated, component: Component, hasProfileInfo, ...rest }) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            hasProfileInfo ? (
                <div>
                    <Header />
                    <Component {...props} />
                </div>
            ) : (
                <Redirect to='/getting-started' />
            )
        ) : (
            <div>
                    <Header />
                    <Component {...props} />
            </div>
        )
    )}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    hasProfileInfo: !!state.profileInfo
});

export default connect(mapStateToProps)(PublicRoute);