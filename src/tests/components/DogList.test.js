import React from 'react';
import { shallow } from 'enzyme';
import { DogList } from '../../components/DogList';
import dogs from '../fixtures/dogs';

test('should render DogList component correctly', () => {
    const wrapper = shallow(<DogList dogs={dogs}/>);
    expect(wrapper).toMatchSnapshot();
});