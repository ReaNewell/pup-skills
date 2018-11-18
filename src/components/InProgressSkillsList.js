import React from 'react';
import selectSkills from '../selectors/skillsByCategory';
import SkillCard from './SkillCard';

export class InProgressSkillsList extends React.Component {
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
        return (
            <div className={this.props.listIsActive ? "skills-list--inprogress" : "skills-list--inactive"}>
                <p className="dashboard-skills__list-title--inprogress">In Progress</p>
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
            </div>
        )
    };
};

export default InProgressSkillsList;