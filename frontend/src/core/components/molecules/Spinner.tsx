import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';
import { FlexBox } from '../atoms/FlexBox';

export const Spinner = () => (
  <FlexBox flexDirection="column">
    <BootstrapSpinner animation="border" variant="secondary" size="sm" />
  </FlexBox>
);
