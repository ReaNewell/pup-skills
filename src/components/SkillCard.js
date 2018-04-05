import React from 'react';
import { connect } from 'react-redux';
import { startChangeCategory, startRemoveSkill } from '../actions/skills';

export class SkillCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.skill.id,
            dogId: props.skill.dogId,
            name: props.skill.name,
            category: props.skill.category
        }
    }
    startChangeCategory = (skill) => {
        this.props.startChangeCategory(this.state.id, this.state.dogId, this.state.category);
    }
    startRemoveSkill = skill => {
        this.props.startRemoveSkill(this.state.id, this.state.dogId);
    }
    render () {
        return (
            <div className="skill-card">
                <h3 className="skill-card__title">{this.state.name}</h3>
                <div className="skill-card__buttons">
                    <button 
                        onClick={this.startChangeCategory} 
                        className={this.state.category === "Completed" ? "skill-card__button" : "skill-card__button--inprogress"}
                    >
                        Move
                    </button>
                    <button 
                        onClick={this.startRemoveSkill} 
                        className={this.state.category === "Completed" ? "skill-card__button" : "skill-card__button--inprogress"}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    startChangeCategory: (id, dogId, category) => dispatch(startChangeCategory(id, dogId, category)),
    startRemoveSkill: (id, dogId) => dispatch(startRemoveSkill(id, dogId))
});

export default connect(undefined, mapDispatchToProps)(SkillCard);