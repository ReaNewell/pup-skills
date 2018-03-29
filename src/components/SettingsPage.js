import React from 'react';
import { connect } from 'react-redux';

import { startRemoveDog } from '../actions/dogs';
import { startUpdateProfile } from '../actions/profile';
import EditDogForm from './EditDogForm';

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDog: {},
            currentDogId: "",
            profileName: props.profileName,
            removeDogWarning: false,
            editDogModal: false,
            updatingProfileName: false
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState(() => ({ profileName: nextProps.profileName }));
    }
    removeDog = () => {
        this.props.startRemoveDog(this.state.currentDog)
        this.closeRemoveDogWarningModal();
    }
    profileNameOnChange = (e) => {
        const profileName = e.target.value;
        this.setState(() => ({ profileName }));
    }
    updateProfileName = (e) => {
        e.preventDefault();

        this.props.startUpdateProfile({
            profileName: this.state.profileName
        });

        this.setState(() => ({ updatingProfileName: false }))
    }
    openUpdateProfileName = () => {
        this.setState(() => ({ updatingProfileName: true }))
    }

    // MODALS
    closeRemoveDogWarningModal = () => {
        this.setState(() => ({ currentDogId: "" }))
        this.setState(() => ({ removeDogWarning: false }))
    }
    openRemoveDogWarningModal = (e) => {
        const id = e.target.value
        this.setState(() => ({ removeDogWarning: true }));
        this.setState(() => ({ currentDogId: id }));
    }
    closeEditDogModal = () => {
        this.setState(() => ({ currentDog: {} }))
        this.setState(() => ({ editDogModal: false }))
    }
    openEditDogModal = (e) => {
        const dog = this.props.dogs.filter(dog => dog.id === e.target.value)[0];
        console.log(dog);
        this.setState(() => ({ editDogModal: true }));
        this.setState(() => ({ currentDog: dog }));
    }

    render() {
        return (
            <div className="content-container">
                <h1>Edit Profile</h1>
                <div className="settings-page__board">
                    <h3>Profile Settings</h3>
                    { this.state.updatingProfileName ? (
                        <form onSubmit={this.updateProfileName}>
                            <p>Profile Name: <input type="text" value={this.state.profileName} onChange={this.profileNameOnChange}/></p>
                            <button>Update Name</button>
                        </form>
                    ) : (
                        <div>
                            <p>Profile Name: {this.state.profileName}</p>
                            <button onClick={this.openUpdateProfileName}>Edit Profile Name</button>
                        </div>
                    ) }
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
                                        <button onClick={this.openEditDogModal} value={dog.id}>Edit Dog</button>
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
                { this.state.editDogModal &&
                    <EditDogForm dog={this.state.currentDog} closeEditDogModal={this.closeEditDogModal}/>
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
    startRemoveDog: (data) => dispatch(startRemoveDog(data)),
    startUpdateProfile: (data) => dispatch(startUpdateProfile(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);