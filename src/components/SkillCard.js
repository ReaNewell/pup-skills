import React from 'react';
import { connect } from 'react-redux';
import { changeCategory, removeSkill } from '../actions/skills';

export class SkillCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.skill.id,
            name: props.skill.name,
            category: props.skill.category
        }
    }
    changeCategory = (skill) => {
        this.props.changeCategory(this.state.id, this.state.category);
    }
    removeSkill = skill => {
        this.props.removeSkill(this.state.id);
    }
    render () {
        return (
            <div>
                <h3>{this.state.name}</h3>
                <button onClick={this.changeCategory}>Change Category</button>
                <button onClick={this.removeSkill}>X</button>
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    changeCategory: (id, category) => dispatch(changeCategory(id, category)),
    removeSkill: (data) => dispatch(removeSkill(data))
});

export default connect(undefined, mapDispatchToProps)(SkillCard);