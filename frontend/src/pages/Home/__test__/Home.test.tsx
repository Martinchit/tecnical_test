import React from 'react';
import { shallow } from 'enzyme';

import { Home } from '../Home';
import { AuthForm } from '../components/form/AuthForm';
import { SwitchButton } from '../components/button/SwitchButton';

describe('Home', () => {
  const email = 'test@test.com';
  const password = '12345678';
  const confirmPassword = '12345678';
  const waitForAsync = () => new Promise((resolve) => setImmediate(resolve));
  const props = {
    logInAction: jest.fn(),
    signUpAction: jest.fn(),
    authError: '',
  };
  it('renders correctly', () => {
    const wrapper = shallow(<Home {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles onEmailChange', async () => {
    const email = 'test';
    const wrapper = shallow(<Home {...props} />);
    wrapper.find(AuthForm).first().props().onEmailChange(email);
    const stockListWrapper = wrapper.instance() as Home;
    await waitForAsync();
    expect(stockListWrapper.state.email).toBe(email);
    expect(stockListWrapper.state.formError).toBe(
      'Email has to be in email pattern'
    );
  });

  it('handles onEmailChange with correct pattern', async () => {
    const wrapper = shallow(<Home {...props} />);
    wrapper.find(AuthForm).first().props().onEmailChange(email);
    const stockListWrapper = wrapper.instance() as Home;
    await waitForAsync();
    expect(stockListWrapper.state.email).toBe(email);
    expect(stockListWrapper.state.formError).toBe(
      'Password has to have at least 8 characters and contain only letters or numbers'
    );
  });

  it('handles onPasswordChange', async () => {
    const password = '1234';
    const wrapper = shallow(<Home {...props} />);
    wrapper.find(AuthForm).first().props().onPasswordChange(password);
    const stockListWrapper = wrapper.instance() as Home;
    await waitForAsync();
    expect(stockListWrapper.state.password).toBe(password);
    expect(stockListWrapper.state.formError).toBe(
      'Email has to be in email pattern'
    );
  });

  it('handles onPasswordChange with correct pattern', async () => {
    const wrapper = shallow(<Home {...props} />);
    wrapper.setState({ email });
    wrapper.find(AuthForm).first().props().onPasswordChange(password);
    const stockListWrapper = wrapper.instance() as Home;
    await waitForAsync();
    expect(stockListWrapper.state.password).toBe(password);
    expect(stockListWrapper.state.formError).toBe(
      'Confirm Password has to be same as Password'
    );
  });

  it('handles onPasswordChange with correct pattern in Log In mode', async () => {
    const wrapper = shallow(<Home {...props} />);
    wrapper.setState({ email, authType: 'Log In' });
    wrapper.find(AuthForm).first().props().onPasswordChange(password);
    const stockListWrapper = wrapper.instance() as Home;
    await waitForAsync();
    expect(stockListWrapper.state.password).toBe(password);
    expect(stockListWrapper.state.formError).toBe('');
  });

  it('handles onPasswordChange', async () => {
    const confirmPassword = '1234';
    const wrapper = shallow(<Home {...props} />);
    wrapper.setState({ email, password });
    wrapper
      .find(AuthForm)
      .first()
      .props()
      .onConfirmPasswordChange(confirmPassword);
    const stockListWrapper = wrapper.instance() as Home;
    await waitForAsync();
    expect(stockListWrapper.state.password).toBe(password);
    expect(stockListWrapper.state.formError).toBe(
      'Confirm Password has to be same as Password'
    );
  });

  it('handles onFormSubmit for signUp', async () => {
    const wrapper = shallow(<Home {...props} />);
    wrapper.setState({ email, password, confirmPassword });
    wrapper.find(AuthForm).first().props().onFormSubmit();
    expect(wrapper.find(AuthForm).first().props().formError).not.toBeTruthy();
    expect(props.signUpAction).toHaveBeenCalled();
    expect(props.signUpAction).toHaveBeenCalledWith(email, password);
  });

  it('handles onFormSubmit for logIn', async () => {
    const wrapper = shallow(<Home {...props} />);
    wrapper.setState({ email, password, confirmPassword, authType: 'Log In' });
    wrapper.find(AuthForm).first().props().onFormSubmit();
    expect(wrapper.find(AuthForm).first().props().formError).not.toBeTruthy();
    expect(props.logInAction).toHaveBeenCalled();
    expect(props.logInAction).toHaveBeenCalledWith(email, password);
  });

  it('handles onAuthTypeChangeHandler', () => {
    const wrapper = shallow(<Home {...props} />);
    wrapper.find(SwitchButton).first().props().onClick();
    const stockListWrapper = wrapper.instance() as Home;
    expect(stockListWrapper.state.authType).toBe('Log In');
  });

  it('handles onAuthTypeChangeHandler', () => {
    const wrapper = shallow(<Home {...props} />);
    wrapper.setState({ authType: 'Log In' });
    wrapper.find(SwitchButton).first().props().onClick();
    const stockListWrapper = wrapper.instance() as Home;
    expect(stockListWrapper.state.authType).toBe('Sign Up');
  });
});
