import React from 'react';
import { connect } from 'react-redux';
import selectSkills from '../selectors/skillsByCategory';

import SkillCard from './SkillCard';

export const InProgressSkillsList = (props) => (
    <div>
        {
            props.skills.length === 0 ? (
                <p>There are no in progress skills.</p>
            ) : (
                props.skills.map((skill, index) => (
                    <SkillCard
                        key = {skill.id}
                        skill = {skill}
                    />
                ))
            )
        }
    </div>
);

const mapStateToProps = (state) => {
    return {
        skills: selectSkills(state.skills, 'In Progress')
    }
};

export default connect(mapStateToProps)(InProgressSkillsList);