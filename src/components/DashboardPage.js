import React from 'react';
import {connect} from 'react-redux';

import DashboardSkills from './DashboardSkills';
import DashboardSideBar from './DashboardSideBar';

class DashboardPage extends React.Component {
    componentWillMount() {
        if (!this.props.hasProfileName) {
            this.props.history.push('/getting-started');
        }
    }
    render() {
        return (
            <div className="dashboard-page content-container">
                <DashboardSideBar />
                <DashboardSkills />
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    hasProfileName: !!state.profileInfo.profileName
})

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);