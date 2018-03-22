import React from 'react';
import { connect } from 'react-redux';

import { addSkill } from '../actions/skills';

class SkillsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            category: "In Progress",
            error: ""
        }
    };
    onCategoryChange = (e) => {
        const category = e.target.value
        this.setState(() => ({ category }));
    };
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }));
    };
    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.name) {
            this.setState(() => ({ error: "You must name your skill." }));
        } else {
            this.setState(() => ({ error: "" }));
            this.props.addSkill({
                name: this.state.name,
                category: this.state.category
            });
        }
    };
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                { this.state.error && <p>{this.state.error}</p>}
                <input
                    onChange={this.onNameChange}
                    placeholder="Add Skill"
                    type="text"
                    value={this.state.name}
                />
                <select
                    onChange={this.onCategoryChange}
                    value={this.state.category}
                >
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <button>Add Skill</button>
            </form>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    addSkill: (skill) => dispatch(addSkill(skill))
});

export default connect(undefined, mapDispatchToProps)(SkillsForm);