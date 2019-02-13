import React from 'react';
import { connect } from 'react-redux';
import { startAddDog } from '../actions/dogs';

export class DogForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            breed: '',
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
    // Adds dog object to dogs array in Firebase, then closes the modal form.
    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.name) {
            this.setState(() => ({ error: "You must name your Pup." }));
        } else {
            const selectedFile = document.getElementById('file-input').files[0];

            this.setState(() => ({ error: "" }));
            this.props.startAddDog({
                name: this.state.name,
                breed: this.state.breed
            }, selectedFile);
            this.setState(() => ({ name: "" }));
            this.setState(() => ({ breed: "" }));
            this.props.closeModal();
        }
    };

    render() {
        return (
            <form onSubmit={this.onSubmit} className="dog-form-window">
                <div className="dog-form">
                    <div className="dog-form__exit" onClick={this.props.closeModal}>X</div>
                    <h3 className="dog-form__title">Add your Pup</h3>
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
                    <button className="dog-form__button">Add Dog</button>
                </div>
            </form>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    startAddDog: (dog, picture) => dispatch(startAddDog(dog, picture))
});
export default connect(undefined, mapDispatchToProps)(DogForm);