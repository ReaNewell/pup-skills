import React from 'react';
import selectSkills from '../selectors/skillsByCategory';


import SkillCard from './SkillCard';

export default class CompletedSkillsList extends React.Component {
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
        return (
            <div className={this.props.listIsActive ? "skills-list" : "skills-list--inactive"}>
                <p className="dashboard-skills__list-title">Completed</p>
                {   
                    this.state.completedSkills.length === 0 ? (
                        <p className="skills-list__message">There are no completed skills.</p>
                    ) : (
                        this.state.completedSkills.map((skill, index) => (
                                <SkillCard
                                    key = {skill.id}
                                    skill = {skill}
                                />
                        ))
                    )
                }
            </div>
        )
    }
};