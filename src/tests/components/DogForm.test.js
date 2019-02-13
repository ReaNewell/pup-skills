import React from 'react';
import { shallow } from 'enzyme';
import { DogForm } from '../../components/DogForm';

test('should render DogForm component correctly', () => {
    const wrapper = shallow(<DogForm />);
    expect(wrapper).toMatchSnapshot();
});
test('should render error for invalid form submission', () => {
    const wrapper = shallow(<DogForm />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set dog name on input change', () => {
    const value = 'Phoebe';
    const wrapper = shallow(<DogForm />);
    wrapper.find('.dog-form__text-input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('name')).toBe(value);
});
test('should set dog breed on input change', () => {
    const value = 'Shiba Inu';
    const wrapper = shallow(<DogForm />);
    wrapper.find('.dog-form__text-input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('breed')).toBe(value);
});
// test('should set dog picture on input change', () => {
    
// });

test('should call startAddDog on valid form submission', () => {});