import React from 'react';
import { shallow } from 'enzyme';
import { LoadingPage } from '../../components/LoadingPage';

test('should render header correctly', () => {
    const wrapper = shallow(<LoadingPage startLogout={() => { }}/>);
    expect(wrapper).toMatchSnapshot();
});