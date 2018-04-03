import React from 'react';
import { connect } from 'react-redux';

import { startAddDog } from '../actions/dogs';

class DogForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            breed: '',
            error: ""
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
    // Adds dog object to dogs array in Firebase, then closes the modal form.
    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.name) {
            this.setState(() => ({ error: "You must name your Pup." }));
        } else {
            this.setState(() => ({ error: "" }));
            this.props.startAddDog({
                name: this.state.name,
                breed: this.state.breed
            });
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
    startAddDog: (dog) => dispatch(startAddDog(dog))
});

export default connect(undefined, mapDispatchToProps)(DogForm);