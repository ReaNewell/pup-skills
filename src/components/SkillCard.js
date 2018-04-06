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
            category: props.skill.category,
            description: props.skill.description ? props.skill.description : '',
            activated: false
        }
    }
    startChangeCategory = (skill) => {
        this.props.startChangeCategory(this.state.id, this.state.dogId, this.state.category);
    }
    startRemoveSkill = skill => {
        this.props.startRemoveSkill(this.state.id, this.state.dogId);
    }
    activateCard = () => {
        this.setState(() => ({ activated: true }));
    }
    deactivateCard = () => {
        this.setState(() => ({ activated: false }));
    }
    render () {
        return (
            <div className="skill-card">
                {
                    this.state.activated ? (
                        <div>
                            <h3 className="skill-card__title" onClick={this.deactivateCard}>{this.state.name}</h3>
                            <p>{this.state.description}</p>
                        </div>
                    ) : (
                        <h3 className="skill-card__title" onClick={this.activateCard}>{this.state.name}</h3>
                    )
                }
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