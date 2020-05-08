import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const HeaderButton = styled(Button)`
  margin-left: 1%;
  width: 10%;
  min-width: 85px;

  @media (max-width: 767px) {
    width: 50%;
    margin-top: 5%;
    font-size: 0.8rem;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;
