import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import selectSkills from '../../selectors/skillsByCategory';
import SkillCard from '../SkillCard';

export default class MobileInProgressSkillsList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            inProgressSkills: props.activeDog.skills ? selectSkills(props.activeDog.skills, "In Progress") : []
        };
    };
    componentWillReceiveProps(nextProps) {
        this.setState({ inProgressSkills: selectSkills(nextProps.activeDog.skills, "In Progress") });
    };
    render() {
        const transition = {
            transitionName: "skill-fade",
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 500
        };

        return (
            <div className={this.props.listIsActive ? "skills-list--inprogress" : "skills-list--inactive"}>
                <ReactCSSTransitionGroup {...transition}>
                    {   
                        this.state.inProgressSkills.length === 0 ? (
                            <p className="skills-list__message">There are no skills in progress.</p>
                        ) : (
                            this.state.inProgressSkills.map((skill, index) => (
                                <SkillCard
                                    key = {skill.id}
                                    skill = {skill}
                                />
                            ))
                        )
                    }
                </ReactCSSTransitionGroup>
            </div>
        )
    };
};