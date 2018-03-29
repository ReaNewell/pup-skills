import React from 'react';
import { connect } from 'react-redux';

import { startRemoveDog } from '../actions/dogs';

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDog: "",
            profileName: props.profileName,
            removeDogWarning: false
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState(() => ({ profileName: nextProps.profileName }));
    }
    removeDog = () => {
        this.props.startRemoveDog(this.state.currentDog)
        this.closeRemoveDogWarningModal();
    }
    closeRemoveDogWarningModal = () => {
        this.setState(() => ({ currentDog: "" }))
        this.setState(() => ({ removeDogWarning: false }))
    }
    openRemoveDogWarningModal = (e) => {
        const id = e.target.value
        this.setState(() => ({ removeDogWarning: true }));
        this.setState(() => ({ currentDog: id }));
        console.log(id);
    }
    render() {
        return (
            <div className="content-container">
                <h1>Edit Profile</h1>
                <div className="settings-page__board">
                    <h3>Profile Settings</h3>
                    <div>
                        <p>Profile Name: {this.state.profileName}</p>
                        <button>Edit Profile Name</button>
                    </div>
                    <h3>Pups Settings</h3>
                    <div>
                        {this.props.dogs.length === 0 ? (
                            <p>There are no dogs.</p>
                        ) : (
                            this.props.dogs.map((dog) => (
                                <div key={dog.id}>
                                    <div>
                                        <p>Name: {dog.name}</p>
                                        <p>Breed: {dog.breed}</p>
                                    </div>
                                    <div>
                                        <button>Edit Dog</button>
                                        <button onClick={this.openRemoveDogWarningModal} value={dog.id}>Remove Dog</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                { this.state.removeDogWarning && 
                    <div>
                        <div>
                            <h2>Are you sure you want to delete your dog and associated skills?</h2>
                            <div>
                                <button onClick={this.removeDog}>Yes, I'm sure.</button>
                                <button onClick={this.closeRemoveDogWarningModal}>No, nevermind.</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    dogs: state.dogs,
    profileName: state.profileInfo.profileName
});

const mapDispatchToProps = (dispatch) => ({
    startRemoveDog: (data) => dispatch(startRemoveDog(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);