import React from 'react';
import { shallow } from 'enzyme';
import DashboardSideBar from '../../components/DashboardSideBar';

test('should render DashboardSideBar component correctly', () => {
    const wrapper = shallow(<DashboardSideBar />);
    expect(wrapper).toMatchSnapshot();
});