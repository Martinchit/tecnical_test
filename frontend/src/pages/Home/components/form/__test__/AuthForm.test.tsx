import React from 'react';
import { shallow } from 'enzyme';
import { Button, Form } from 'react-bootstrap';
import { ErrorMessage } from '../../../../../core/components/atoms/ErrorMessage';
import { Alert } from '../../../../../core/components/atoms/Alert';

import { AuthForm } from '../AuthForm';

describe('AuthForm', () => {
  const props = {
    onEmailChange: jest.fn(),
    onPasswordChange: jest.fn(),
    onConfirmPasswordChange: jest.fn(),
    onFormSubmit: jest.fn(),
    email: 'email',
    password: 'password',
    confirmPassword: 'confirmPassword',
    authType: 'Log In',
    formError: '',
    authError: '',
  };

  it('renders correctly', () => {
    const wrapper = shallow(<AuthForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders no confirmPassword field', () => {
    const wrapper = shallow(<AuthForm {...props} />);
    expect(wrapper.find(Form.Control).length).toBe(2);
  });

  it('triggers onEmailChange', () => {
    const email = 'testEmail';
    const event = { target: { value: email } };
    const wrapper = shallow(<AuthForm {...props} />);
    wrapper.find(Form.Control).at(0).simulate('change', event);
    expect(props.onEmailChange).toHaveBeenCalled();
    expect(props.onEmailChange).toHaveBeenCalledWith(email);
  });

  it('triggers onPasswordChange', () => {
    const password = 'testPassword';
    const event = { target: { value: password } };
    const wrapper = shallow(<AuthForm {...props} />);
    wrapper.find(Form.Control).at(1).simulate('change', event);
    expect(props.onPasswordChange).toHaveBeenCalled();
    expect(props.onPasswordChange).toHaveBeenCalledWith(password);
  });

  it('renders confirmPassword field', () => {
    const p = { ...props, authType: 'Sign Up' };
    const wrapper = shallow(<AuthForm {...p} />);
    expect(wrapper.find(Form.Control).length).toBe(3);
  });

  it('triggers onConfirmPasswordChange when authType', () => {
    const p = { ...props, authType: 'Sign Up' };
    const confirmPassword = 'testPassword';
    const event = { target: { value: confirmPassword } };
    const wrapper = shallow(<AuthForm {...p} />);
    wrapper.find(Form.Control).at(2).simulate('change', event);
    expect(props.onConfirmPasswordChange).toHaveBeenCalled();
    expect(props.onConfirmPasswordChange).toHaveBeenCalledWith(confirmPassword);
  });

  it('renders Alert', () => {
    const p = { ...props, authError: 'TestError' };
    const wrapper = shallow(<AuthForm {...p} />);
    expect(wrapper.find(Alert).length).toBe(1);
    expect(wrapper.find(Alert).text()).toBe(
      `${p.authType} Error: ${p.authError}`
    );
  });

  it('renders ErrorMessage', () => {
    const formError = 'testError';
    const p = { ...props, formError };
    const wrapper = shallow(<AuthForm {...p} />);
    expect(wrapper.find(ErrorMessage).length).toBe(1);
    expect(wrapper.find(ErrorMessage).text()).toBe(formError);
    expect(wrapper.find(Button).props().disabled).toBeTruthy();
  });
});
