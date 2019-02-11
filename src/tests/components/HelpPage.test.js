import React from 'react';
import { shallow } from 'enzyme';
import { HelpPage } from '../../components/HelpPage';

test('should render HelpPage component correctly', () => {
    const wrapper = shallow(<HelpPage />);
    expect(wrapper).toMatchSnapshot();
});