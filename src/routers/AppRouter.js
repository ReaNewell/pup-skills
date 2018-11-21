import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import GettingStartedPage from '../components/GettingStartedPage';
import HelpPage from '../components/HelpPage'
import LandingPage from '../components/LandingPage';
import NotFoundPage from '../components/NotFoundPage';
import SettingsPage from '../components/SettingsPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LandingPage} exact={true}/>
                <PublicRoute path="/help" component={HelpPage} />
                <PrivateRoute path="/dashboard" component={DashboardPage} />
                <PrivateRoute path="/settings" component={SettingsPage} />
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