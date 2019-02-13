import React from 'react';
import { shallow } from 'enzyme';
import { DashboardPage } from '../../components/DashboardPage';

test('should render DashboardPage component correctly when user info is detected', () => {
    const wrapper = shallow(<DashboardPage hasProfileName={true} />);
    expect(wrapper).toMatchSnapshot();
});