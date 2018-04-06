import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import selectSkills from '../../selectors/skillsByCategory';


import SkillCard from '../SkillCard';

export default class MobileCompletedSkillsList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            completedSkills: props.activeDog.skills ? selectSkills(props.activeDog.skills, "Completed") : []
        };
    };
    componentWillReceiveProps(nextProps) {
        this.setState({ completedSkills: selectSkills(nextProps.activeDog.skills, "Completed") });
    };
    render() {
        const transition = {
            transitionName: "skill-fade",
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 500
        };

        return (
            <div className={this.props.listIsActive ? "skills-list" : "skills-list--inactive"}>
                {   
                    this.state.completedSkills.length === 0 ? (
                        <p className="skills-list__message">There are no completed skills.</p>
                    ) : (
                        <ReactCSSTransitionGroup {...transition}>
                            {this.state.completedSkills.map((skill, index) => (
                                    <SkillCard
                                        key = {skill.id}
                                        skill = {skill}
                                    />
                                
                            ))}
                        </ReactCSSTransitionGroup>
                    )
                }
            </div>
        )
    }
};