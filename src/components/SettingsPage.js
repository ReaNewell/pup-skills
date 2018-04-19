import React from 'react';
import { connect } from 'react-redux';

import { startRemoveDog } from '../actions/dogs';
import { startUpdateProfile, startRemoveProfile, startUpdateTheme } from '../actions/profile';
import EditDogForm from './EditDogForm';

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDog: {},
            currentDogId: "",
            profileName: props.profileName,
            profileTheme: props.profileTheme ? prop.profileTheme : 'default',
            removeDogWarning: false,
            removeProfileWarning: false,
            editDogModal: false,
            updatingProfileName: false
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState(() => ({ profileName: nextProps.profileName }));
    };
    removeProfile = () => {
        this.props.startRemoveProfile();
    };

    // UPDATING STATE
    removeDog = () => {
        this.props.startRemoveDog(this.state.currentDogId);
        this.closeRemoveDogWarningModal();
    };
    profileNameOnChange = (e) => {
        const profileName = e.target.value;
        this.setState(() => ({ profileName }));
    };
    updateProfileName = (e) => {
        e.preventDefault();
        this.props.startUpdateProfile({
            profileName: this.state.profileName
        });
        this.setState(() => ({ updatingProfileName: false }));
    };
    updateProfileTheme = (e) => {
        e.preventDefault();
        const profileTheme = e.target.value;
        this.props.startUpdateTheme(profileTheme);
        this.setState(() => ({ profileTheme }));
    }
    openUpdateProfileName = () => {
        this.setState(() => ({ updatingProfileName: true }));
    };

    // MODALS
    closeRemoveDogWarningModal = () => {
        this.setState(() => ({ currentDogId: "" }));
        this.setState(() => ({ removeDogWarning: false }));
    };
    openRemoveDogWarningModal = (e) => {
        const id = e.target.value;
        this.setState(() => ({ removeDogWarning: true }));
        this.setState(() => ({ currentDogId: id }));
    };
    closeRemoveProfileWarningModal = () => {
        this.setState(() => ({ removeProfileWarning: false }));
    };
    openRemoveProfileWarningModal = () => {
        this.setState(() => ({ removeProfileWarning: true }));
    };
    closeEditDogModal = () => {
        this.setState(() => ({ currentDog: {} }));
        this.setState(() => ({ editDogModal: false }));
    };
    openEditDogModal = (e) => {
        const dog = this.props.dogs.filter(dog => dog.id === e.target.value)[0];
        this.setState(() => ({ editDogModal: true }));
        this.setState(() => ({ currentDog: dog }));
    };

    render() {
        return (
            <div className="content-container settings-page">
                <h1 className="settings-page__title">Edit Profile</h1>
                <div className="settings-page__board">

                    {/* PROFILE SETTINGS */}
                    <h3 className="settings-page__subtitle">Profile Settings</h3>
                    {
                        this.state.updatingProfileName ? (
                            <form onSubmit={this.updateProfileName} className="settings-page__board__tile">
                                <p>
                                    Profile Name: 
                                    <input 
                                        type="text" 
                                        value={this.state.profileName} 
                                        onChange={this.profileNameOnChange} 
                                        className="settings-page__text-input"
                                    />
                                </p>
                                <button className="settings-page__button">Update Name</button>
                            </form>
                        ) : (
                            <div>
                                <div className="settings-page__board__tile">
                                    <p>Profile Name: {this.state.profileName}</p>
                                    <button onClick={this.openUpdateProfileName} className="settings-page__button">Edit Profile Name</button>
                                </div>
                                <div className="settings-page__board__tile">
                                    <p>Theme: {this.state.profileTheme}</p>
                                    <div className='theme-buttons'>
                                        <button className='theme-button' onClick={this.updateProfileTheme} value="default"></button>
                                        <button className='theme-button--blue' onClick={this.updateProfileTheme} value="blue"></button>
                                        <button className='theme-button--orange' onClick={this.updateProfileTheme} value="orange"></button>
                                        <button className='theme-button--pink' onClick={this.updateProfileTheme} value="pink"></button>
                                    </div>
                                </div>
                            </div>
                        ) 
                    }

                    {/* DOG SETTINGS */}
                    <h3 className="settings-page__subtitle">Pups Settings</h3>
                    <div>
                        {this.props.dogs.length === 0 ? (
                            <p>There are no dogs.</p>
                        ) : (
                            this.props.dogs.map((dog) => (
                                <div key={dog.id} className="settings-page__board__tile">
                                    <div>
                                        <p>Name: {dog.name}</p>
                                        <p>Breed: {dog.breed}</p>
                                    </div>
                                    <div className="settings-page__button-group">
                                        <button 
                                            onClick={this.openEditDogModal} 
                                            value={dog.id} 
                                            className="settings-page__button"
                                        >
                                            Edit Dog
                                        </button>
                                        <button 
                                            onClick={this.openRemoveDogWarningModal} 
                                            value={dog.id} 
                                            className="settings-page__button"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* ACCOUNT DELETION */}
                    <h3 className="settings-page__subtitle">Delete Account</h3>
                    <div className="settings-page__board__tile">
                        <p>Permanently delete account</p>
                        <button onClick={this.openRemoveProfileWarningModal} className="settings-page__button" >Delete Account</button>
                    </div>
                </div>

                { this.state.removeDogWarning && 
                    <div className="warning-modal__container">
                        <div className="warning-modal">
                            <h2 className="warning-modal__message">Are you sure you want to delete your dog and associated skills?</h2>
                            <div>
                                <button 
                                    onClick={this.removeDog} 
                                    className="settings-page__button--warning"
                                >
                                    Yes, I'm sure.
                                </button>
                                <button 
                                    onClick={this.closeRemoveDogWarningModal} 
                                    className="settings-page__button--warning"
                                >
                                    No, nevermind.
                                </button>
                            </div>
                        </div>
                    </div>
                }
                { this.state.editDogModal &&
                    <EditDogForm dog={this.state.currentDog} closeEditDogModal={this.closeEditDogModal}/>
                }
                { this.state.removeProfileWarning &&
                    <div className="warning-modal__container">
                        <div className="warning-modal">
                            <h2 className="warning-modal__message">
                                Are you sure you want to delete your profile and account information?
                                This data cannot be restored.
                            </h2>
                            <div>
                                <button 
                                    onClick={this.removeProfile} 
                                    className="settings-page__button--warning"
                                >
                                    Yes, I'm sure.
                                </button>
                                <button 
                                    onClick={this.closeRemoveProfileWarningModal} 
                                    className="settings-page__button--warning"
                                >
                                    No, nevermind.
                                </button>
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
    profileName: state.profileInfo.profileName,
    profilePicture: state.profileInfo.profilePicture
});

const mapDispatchToProps = (dispatch) => ({
    startRemoveDog: (data) => dispatch(startRemoveDog(data)),
    startRemoveProfile: () => dispatch(startRemoveProfile()),
    startUpdateProfile: (data) => dispatch(startUpdateProfile(data)),
    startUpdateTheme: (data) => dispatch(startUpdateTheme(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);