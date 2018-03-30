import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import DogCard from './DogCard';
import DogForm from './DogForm';

class DogList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            modalOpen: false,
            dogCount: props.dogs.length
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState(() => ({ dogCount: nextProps.dogs.length }))
    }
    closeModal = () => {
        this.setState(() => ({ modalOpen: false }));
    }
    openModal = () => {
        this.setState(() => ({ modalOpen: true }));
    }
    render() {
        return (
            <div className="dog-list">
                {
                    this.state.dogCount === 0 ? (
                        <p>Please Add A Dog</p>
                    ) : (
                        this.props.dogs.map((dog, index) => (
                            <DogCard 
                                key = {index}
                                dog = {dog}
                            />
                        ))
                    )
                }
                {
                    this.state.dogCount < 3 && <button onClick={this.openModal} className="dog-list__button">Add Dog</button>
                }
                { this.state.modalOpen && <DogForm closeModal={this.closeModal}/>}
                <div className="dog-list__button">
                    <Link to='/settings'>Edit Profile</Link>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    dogs: state.dogs
});

export default connect(mapStateToProps)(DogList);