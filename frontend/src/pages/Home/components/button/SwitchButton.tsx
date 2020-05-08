import React from 'react';
import { ButtonContainer } from './ButtonContainer';
import { FlexBox } from '../../../../core/components/atoms/FlexBox';

interface Props {
  authType: string;
  onClick: () => void;
}

export const SwitchButton: React.FC<Props> = ({ authType, onClick }) => (
  <FlexBox margin="10px 0">
    <ButtonContainer id="change_auth_type_button" onClick={onClick} variant="light">
      {authType === 'Log In' ? 'Change to Sign Up' : 'Change to Log In'}
    </ButtonContainer>
  </FlexBox>
);
