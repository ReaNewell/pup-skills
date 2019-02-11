import React from 'react';
import { shallow } from 'enzyme';
import { AuthModal } from '../../components/AuthModal';

// RENDER TESTS
test('should render the AuthModal component correctly', () => {
    const wrapper = shallow(<AuthModal />);
    expect(wrapper).toMatchSnapshot();
});

// STARTSIGNUP TESTS
test('should call startSignUp when sign up button is clicked and email/password are provided', () => {
    const startSignUp = jest.fn();
    const wrapper = shallow(<AuthModal startSignUp={startSignUp} />);
    wrapper.setState({
        email: 'example@mail.com',
        password: 'justacode1'
    });
    wrapper.find('.auth-modal__button--signUp').simulate('click');
    expect(startSignUp).toHaveBeenCalled();
});
test('should not call startSignUp when signup button is clicked and email/password are not provided', () => {
    const startSignUp = jest.fn();
    const wrapper = shallow(<AuthModal startSignUp={startSignUp} />);
    wrapper.find('.auth-modal__button--signUp').simulate('click');
    expect(startSignUp).not.toHaveBeenCalled();
});
test('should only call startSignUp if password is more than 8 characters and includes only number and letters', () => {
    const startSignUp = jest.fn();
    const wrapper = shallow(<AuthModal startSignUp={startSignUp} />);
    wrapper.setState({
        email: 'example@mail.com',
        password: 'dddd'
    });
    wrapper.find('.auth-modal__button--signUp').simulate('click');
    expect(startSignUp).not.toHaveBeenCalled();
});

//STARTLOGINWITHEMAIL TESTS
test('should call startLoginWithEmail when login button is clicked and email/password are provided', () => {
    const startLoginWithEmail = jest.fn(() => Promise.resolve());
    const wrapper = shallow(<AuthModal startLoginWithEmail={startLoginWithEmail} />);
    wrapper.setState({
        email: 'example@mail.com',
        password: 'justacode1'
    });
    wrapper.find('.auth-modal__button--signIn').simulate('click');
    expect(startLoginWithEmail).toHaveBeenCalled();
});
test('should not call startLoginWithEmail when login button is clicked and email/password are not provided', () => {
    const startLoginWithEmail = jest.fn();
    const wrapper = shallow(<AuthModal startLoginWithEmail={startLoginWithEmail} />);
    wrapper.find('.auth-modal__button--signIn').simulate('click');
    expect(startLoginWithEmail).not.toHaveBeenCalled();
});