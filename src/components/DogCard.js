import React from 'react';
import { connect } from 'react-redux';
import selectSkills from '../selectors/skillsByCategory';
import { activateDog } from '../actions/dogs';

export class DogCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.dog.id,
            name: props.dog.name,
            skills: selectSkills(props.dog.skills, "Completed").length
        }
    };
    componentWillReceiveProps(nextProps) {
        this.setState({ skills: selectSkills(nextProps.dog.skills, "Completed").length });  
    };
    // Deactivates all dogs, activates Dog Card that is clicked.
    activateDog = () => {
        this.props.activateDog(this.state.id);
        this.props.toggleBar && this.props.toggleBar();
    };
    render () {
        return (
            <div className={this.props.dog.isActive ? "dog-card dog-card--active" : "dog-card"} onClick={this.activateDog}>
                <h3>{this.state.name} knows {this.state.skills} skills.</h3>
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    activateDog: (data) => dispatch(activateDog(data))
});

export default connect(undefined, mapDispatchToProps)(DogCard);