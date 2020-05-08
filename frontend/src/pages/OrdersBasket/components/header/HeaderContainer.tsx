import styled from 'styled-components';
import { FlexBox } from '../../../../core/components/atoms/FlexBox';

export const HeaderContainer = styled(FlexBox)`
  justify-content: flex-end;
  margin: 2% 0;
  width: 100%;

  @media (max-width: 767px) {
    justify-content: center;
  }
`;
