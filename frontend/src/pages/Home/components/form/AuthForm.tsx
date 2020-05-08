import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { AuthFormContainer } from './AuthFormContainer';
import { FlexBox } from '../../../../core/components/atoms/FlexBox';
import { ErrorMessage } from '../../../../core/components/atoms/ErrorMessage';
import { Alert } from '../../../../core/components/atoms/Alert';
import { AuthType } from '../../../../core/lib/utils/authType';

interface Props {
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onFormSubmit: () => void;
  email: string;
  password: string;
  confirmPassword: string;
  authType: string;
  formError: string;
  authError: string;
}

export const AuthForm: React.FC<Props> = ({
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onFormSubmit,
  email,
  password,
  confirmPassword,
  authType,
  formError,
  authError,
}) => (
  <AuthFormContainer>
    <Form>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={({ target }) => onEmailChange(target.value)}
          value={email}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={({ target }) => onPasswordChange(target.value)}
          value={password}
        />
      </Form.Group>
      {authType === AuthType[0] ? (
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Enter Confirm Password"
            onChange={({ target }) => onConfirmPasswordChange(target.value)}
            value={confirmPassword}
          />
        </Form.Group>
      ) : null}
      {formError.length ? (
        <FlexBox>
          <ErrorMessage>{formError}</ErrorMessage>
        </FlexBox>
      ) : null}

      <FlexBox margin="10% 0 0 0">
        <Button
          onClick={onFormSubmit}
          disabled={formError.length > 0 || !email || !password}
          variant="primary"
        >
          Submit
        </Button>
      </FlexBox>
      {authError ? (
        <FlexBox margin="15px 0 5px 0">
          <Alert variant="danger">
            {authType} Error: {authError}
          </Alert>
        </FlexBox>
      ) : null}
    </Form>
  </AuthFormContainer>
);
