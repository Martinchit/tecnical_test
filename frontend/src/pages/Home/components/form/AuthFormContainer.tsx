import styled from 'styled-components';

export const AuthFormContainer = styled.div`
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;
  margin-top: 1rem;
  width: 40%;

  @media (max-width: 767px) {
    width: 80%;
  }
`;
