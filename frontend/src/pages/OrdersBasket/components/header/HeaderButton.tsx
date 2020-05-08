import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const HeaderButton = styled(Button)`
  margin-left: 2%;
  width: 10%;

  @media (max-width: 767px) {
    width: 45%;
    margin-top: 3%;
    font-size: 0.8rem;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;
