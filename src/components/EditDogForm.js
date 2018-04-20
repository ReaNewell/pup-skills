import React from 'react';
import { connect } from 'react-redux';

import { startEditDog } from '../actions/dogs';

class EditDogForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.dog.name ? this.props.dog.name : "",
            breed: this.props.dog ? this.props.dog.breed : "",
            currentPictureName: this.props.dog.pupPictureName ? this.props.dog.pupPictureName : "",
            error: "",
            uploadComplete: false
        }
    };
    onBreedChange = (e) => {
        const breed = e.target.value;
        this.setState(() => ({ breed }));
    };
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }));
    };
    onUploadComplete = (e) => {
        const upload = e.target.value;
        if (upload) {
            this.setState(() => ({ uploadComplete: true}));
        }
    };
    // Edits dog object to dogs array in Firebase, then closes the modal form.
    onSubmit = (e) => {
        e.preventDefault();
        const selectedFile = document.getElementById('file-input').files[0];

        if (!this.state.name) {
            this.setState(() => ({ error: "You must name your Pup." }));
        } else {
            this.setState(() => ({ error: "" }));
            this.props.startEditDog(this.props.dog.id, {
                name: this.state.name,
                breed: this.state.breed
            }, this.state.currentPictureName ,selectedFile);
            this.setState(() => ({ name: "" }));
            this.setState(() => ({ breed: "" }));
            this.props.closeEditDogModal();
        }
    };

    render() {
        return (
            <form onSubmit={this.onSubmit} className="dog-form-window">
                <div className="dog-form">
                    <div className="dog-form__exit" onClick={this.props.closeEditDogModal}>X</div>
                    <h3 className="dog-form__title">Update your Pup Info</h3>
                    <label className={this.state.uploadComplete ? "getting-started__file-upload--complete" : "getting-started__file-upload"}>
                        Add Pup Picture
                        <input 
                            accept=".png, .jpg, .jpeg"
                            className='getting-started__file-input'
                            id='file-input'
                            onChange={this.onUploadComplete}
                            type='file'
                        />
                    </label>
                    <div className="dog-form__entry">
                        <label className="dog-form__label">Pup's Name</label>
                        <input
                            className="dog-form__text-input"
                            onChange={this.onNameChange}
                            type="text"
                            value={this.state.name}
                        />
                    </div>
                    <div className="dog-form__entry">
                        <label className="dog-form__label">Breed</label>
                        <input
                            className="dog-form__text-input"
                            onChange={this.onBreedChange}
                            type="text"
                            value={this.state.breed}
                        />
                    </div>
                    { this.state.error && <p>{this.state.error}</p>}
                    <button className="dog-form__button">Update Dog</button>
                </div>
            </form>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    startEditDog: (id, updates, currentPicture, selectedFile) => dispatch(startEditDog(id, updates, currentPicture, selectedFile))
});

export default connect(undefined, mapDispatchToProps)(EditDogForm);