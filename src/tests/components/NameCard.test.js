import React from 'react';
import { shallow } from 'enzyme';
import { NameCard } from '../../components/NameCard';

test('should render NameCard component correctly', () => {
    const wrapper = shallow(<NameCard />);
    expect(wrapper).toMatchSnapshot();
});

test('should call toggleBar when clicked', () => {
    const toggleBar = jest.fn();
    const wrapper = shallow(<NameCard toggleBar={toggleBar} />);
    wrapper.simulate('click');
    expect(toggleBar).toHaveBeenCalled();
});