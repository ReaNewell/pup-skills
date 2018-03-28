import React from 'react';
import {connect} from 'react-redux';

import DashboardSkills from './DashboardSkills';
import DashboardSideBar from './DashboardSideBar';
import MobileDashboardSideBar from './mobile/MobileDashboardSideBar';
import MobileDashboardSkills from './mobile/MobileDashboardSkills';

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth
        }
    }
    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
        if (!this.props.hasProfileName) {
            this.props.history.push('/getting-started');
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
      }
    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };
    render() {
        return (
            <div className="dashboard-page content-container">
                {this.state.width > 720 ? <DashboardSideBar /> : <MobileDashboardSideBar/>}
                {this.state.width > 720 ? <DashboardSkills /> : <MobileDashboardSkills/>}
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