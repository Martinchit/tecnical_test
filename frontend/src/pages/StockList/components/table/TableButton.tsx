import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const TableButton = styled(Button)`
  margin-right: 3%;
  width: 40%;

  @media (max-width: 767px) {
    width: 100%;
    margin-top: 5%;
    font-size: 0.8rem;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;
