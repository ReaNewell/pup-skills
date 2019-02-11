import React from 'react';
import { shallow } from 'enzyme';
import { DogCard } from '../../components/DogCard';
import dogs from '../fixtures/dogs';

test('should render DogCard component correctly', () => {
    const wrapper = shallow(<DogCard dog={dogs[0]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should call activateDog when component is clicked', () => {
    const activateDog = jest.fn();
    const wrapper = shallow(<DogCard dog={dogs[0]} activateDog={activateDog} />);
    wrapper.simulate('click');
    expect(activateDog).toHaveBeenCalled();
});