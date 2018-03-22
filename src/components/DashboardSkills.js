import React from 'react';

import CompletedSkillsList from './CompletedSkillsList';
import InProgressSkillsList from './InProgressSkillsList';
import SkillCard from './SkillCard';
import SkillsForm from './SkillsForm';

const DashboardSkills = () => (
    <div>
        These are the Dashboard Skills.
        <SkillsForm />
        <div>
            <CompletedSkillsList />
            <InProgressSkillsList />
        </div>
    </div>
);

export default DashboardSkills;