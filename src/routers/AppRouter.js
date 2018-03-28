import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import GettingStartedPage from '../components/GettingStartedPage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={DashboardPage} />
                <PrivateRoute path="/getting-started" component={GettingStartedPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
);

const mapStateToProps = (state) => ({
    hasProfileName: !!state.profileInfo.profileName
})

export default connect(mapStateToProps)(AppRouter);