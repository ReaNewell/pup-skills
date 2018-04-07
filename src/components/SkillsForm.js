import React from 'react';
import { connect } from 'react-redux';

import { startAddSkill } from '../actions/skills';

class SkillsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            category: "In Progress",
            description: '',
            error: "",
            activeDog: props.activeDog
        }
    };
    componentWillReceiveProps(nextProps) {
        this.setState(() => ({ activeDog: nextProps.activeDog }));
    }
    onCategoryChange = (e) => {
        const category = e.target.value;
        this.setState(() => ({ category }));
    };
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    }
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }));
    };
    // Adds skills object to the active dog's skill array in Firebase.
    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.name) {
            this.setState(() => ({ error: "You must name your skill." }));
        } else {
            let errorOccured = false;
            if (this.state.activeDog.skills) {
                for (let i=0; i<this.state.activeDog.skills.length; i++) {
                    if (this.state.name === this.state.activeDog.skills[i].name) {
                        errorOccured = true;
                    }
                }
            }
            if (!errorOccured) {
                document.getElementById('in-progress').checked = true;
                this.setState(() => ({ error: "" }));
                const skill = {
                    dogId: this.state.activeDog.id,
                    name: this.state.name,
                    category: this.state.category,
                    description: this.state.description
                };
                this.props.startAddSkill(skill);
                this.setState(() => ({ name: "" }));
                this.setState(() => ({ category: "In Progress" }));
                this.setState(() => ({ description: "" }));
                this.props.closeSkillModal();
             } else {
                this.setState(() => ({ error: "You cannot use the same name for more than one skill."}));
             }
        }
    };
    render() {
        return (
            <form onSubmit={this.onSubmit} className="skills-form__window">
                <div className="skills-form">
                    <div className="dog-form__exit" onClick={this.props.closeSkillModal}>X</div>
                    
                    <h2 className="skills-form__title">Add a Skill</h2>
                    { this.state.error && <p className="skills-form__error">{this.state.error}</p>}
                    
                    <input
                        className="skills-form__text-input"
                        onChange={this.onNameChange}
                        placeholder="Add Skill"
                        type="text"
                        value={this.state.name}
                    />
                    
                    <div className="skills-form__radio-input">
                        <div>
                            <input 
                                type="radio" 
                                name="category-input" 
                                value="In Progress" 
                                id="in-progress" 
                                defaultChecked 
                                onClick={this.onCategoryChange}
                            />
                            <label htmlFor="in-progress">In Progress</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                name="category-input" 
                                value="Completed" 
                                id="completed" 
                                onClick={this.onCategoryChange}
                            />
                            <label htmlFor="completed">Completed</label>
                        </div>
                    </div>
                        
                    <textarea
                        className="skills-form__textarea"
                        onChange={this.onDescriptionChange}
                        placeholder="Add a skill description (optional)."
                        value={this.state.description}
                    ></textarea>
                   
                    <button className="skills-form__button">Add Skill</button>
                </div>
            </form>
        );
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    startAddSkill: (skill) => dispatch(startAddSkill(skill))
});

export default connect(undefined, mapDispatchToProps)(SkillsForm);