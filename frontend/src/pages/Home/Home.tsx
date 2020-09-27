import React from 'react';
import { AuthForm } from './components/form/AuthForm';
import { SwitchButton } from './components/button/SwitchButton';
import { FlexBox } from '../../core/components/atoms/FlexBox';
import { PageTitle } from '../../core/components/molecules/PageTitle';
import { AuthType } from '../../core/lib/utils/authType';
import { AuthMode } from '../../types/types';

interface HomeState {
  email: string;
  password: string;
  confirmPassword: string;
  authType: AuthMode;
  formError: string;
}

interface HomeProps {
  logInAction: (email, password) => void;
  signUpAction: (email, password) => void;
  authError: string;
}

export class Home extends React.Component<HomeProps, HomeState> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      authType: AuthType[0],
      formError: '',
    };
  }

  onAuthTypeChangeHandler = () => {
    const { authType } = this.state;
    const newType = AuthType.indexOf(authType) ? AuthType[0] : AuthType[1];
    this.setState({
      authType: newType,
      email: '',
      password: '',
      confirmPassword: '',
      formError: '',
    });
  };

  onConfirmPasswordChange = (confirmPassword) => {
    this.setState({ confirmPassword }, () => {
      this.checkFormValid();
    });
  };

  onPasswordChange = (password) => {
    this.setState({ password }, () => {
      this.checkFormValid();
    });
  };

  onEmailChange = (email) => {
    this.setState({ email }, () => {
      this.checkFormValid();
    });
  };

  checkFormValid = () => {
    const { email, password, confirmPassword, authType } = this.state;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const passwordRegex = /[\d|\w]{8,}/;
    if (!emailRegex.test(email)) {
      return this.setState({ formError: 'Email has to be in email pattern' });
    }
    if (!passwordRegex.test(password)) {
      return this.setState({
        formError:
          'Password has to have at least 8 characters and contain only letters or numbers',
      });
    }

    if (AuthType.indexOf(authType) === 0 && password !== confirmPassword) {
      return this.setState({
        formError: 'Confirm Password has to be same as Password',
      });
    }
    this.setState({ formError: '' });
  };

  onFormSubmit = () => {
    const { authType, email, password } = this.state;
    const { signUpAction, logInAction } = this.props;
    if (AuthType.indexOf(authType)) {
      logInAction(email, password);
    } else {
      signUpAction(email, password);
    }
  };

  render() {
    const {
      email,
      password,
      confirmPassword,
      authType,
      formError,
    } = this.state;
    const { authError } = this.props;
    return (
      <FlexBox>
        <PageTitle title={authType} />
        <AuthForm
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          onConfirmPasswordChange={this.onConfirmPasswordChange}
          onPasswordChange={this.onPasswordChange}
          onEmailChange={this.onEmailChange}
          onFormSubmit={this.onFormSubmit}
          authType={authType}
          formError={formError}
          authError={authError}
        />
        <SwitchButton
          authType={authType}
          onClick={this.onAuthTypeChangeHandler}
        />
      </FlexBox>
    );
  }
}
