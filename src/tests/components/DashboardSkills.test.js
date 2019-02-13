import React from 'react';
import { shallow } from 'enzyme';
import { DashboardSkills } from '../../components/DashboardSkills';
import dogs from '../fixtures/dogs';

test('should render DashboardSkills component correctly', () => {
    const wrapper = shallow(<DashboardSkills dogs={dogs} activeDog={dogs[0]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should open SkillModal when button is clicked', () => {
    const wrapper = shallow(<DashboardSkills dogs={dogs} activeDog={dogs[0]} />);
    wrapper.find('.dashboard-skills__button').simulate('click');
    expect(wrapper.state('skillModalOpen')).toBe(true);
});