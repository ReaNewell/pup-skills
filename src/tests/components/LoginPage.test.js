import React from 'react';
import { shallow } from 'enzyme';
import { LandingPage } from '../../components/LandingPage';

test('should render login page correctly', () => {
    const wrapper = shallow(<LandingPage />);
    expect(wrapper).toMatchSnapshot();
});