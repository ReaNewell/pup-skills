import React from 'react';
import { connect } from 'react-redux';
import { startUpdateProfile } from '../actions/profile';

class GettingStartedPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profileName: ""
        }
    }
    onNameChange = (e) => {
        const profileName = e.target.value;
        this.setState(() => ({ profileName }))
    };
    // Updates profile information, then sends user to the dashboard.
    onSubmit = (e) => {
        e.preventDefault();
        
        const profileInfo = {
            profileName: this.state.profileName
        }
        this.props.startUpdateProfile(profileInfo);
        this.props.history.push('/dashboard');
    };
    componentWillMount() {
        if (this.props.hasProfileName) {
            this.props.history.push('/dashboard');
        }
    };
    render() {
        return (
            <div className="getting-started">
                <h1 className="getting-started__title">Getting Started</h1>
                <form onSubmit={this.onSubmit} className="getting-started__form">
                    <input
                        className="getting-started__text-input"
                        onChange={this.onNameChange}
                        placeholder="Profile Name"
                        type="text"
                        required
                    />
                    <button className="getting-started__button">Get Started</button>
                </form>
            </div>
        )
    };
};

const mapStateToProps = (state) => ({
    hasProfileName : state.profileInfo.profileName
});
const mapDispatchToProps = (dispatch) => ({
    startUpdateProfile: (profileInfo) => dispatch(startUpdateProfile(profileInfo))
});
export default connect(mapStateToProps, mapDispatchToProps)(GettingStartedPage);