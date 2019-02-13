import React from 'react';
import { shallow } from 'enzyme';
import { CompletedSkillsList } from '../../components/CompletedSkillsList';
import dogs from '../fixtures/dogs';

test('should render CompletedSkillsList component correctly when completed skills exist', () => {
    const wrapper = shallow(<CompletedSkillsList activeDog={dogs[0]} />);
    expect(wrapper).toMatchSnapshot();
});
test('should render CompletedSkillsList component correctly when no completed skills exist', () => {
    const wrapper = shallow(<CompletedSkillsList activeDog={dogs[2]} />);
    expect(wrapper).toMatchSnapshot();
});