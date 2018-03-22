import React from 'react';
import { connect } from 'react-redux';
import selectSkills from '../selectors/skillsByCategory';

import SkillCard from './SkillCard';

export const CompletedSkillsList = (props) => (
    <div>
        {
            props.skills.length === 0 ? (
                <p>There are no completed skills.</p>
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
        skills: selectSkills(state.skills, 'Completed')
    }
};

export default connect(mapStateToProps)(CompletedSkillsList);