import styled from 'styled-components';
import { FormControl } from 'react-bootstrap';

export const HeaderInputField = styled(FormControl)`
  width: 30%;
  min-width: 250px;

  @media (max-width: 767px) {
    width: 100%;
  }
`;
