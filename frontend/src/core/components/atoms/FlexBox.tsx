import styled from 'styled-components';

export interface FlexBoxProps {
  flexDirection?: string;
  flexWrap?: string;
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
}

export const FlexBox = styled.div<FlexBoxProps>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection ?? 'row'};
  flex-wrap: ${({ flexWrap }) => flexWrap ?? 'wrap'};
  justify-content: ${({ justifyContent }) => justifyContent ?? 'center'};
  align-items: ${({ alignItems }) => alignItems ?? 'center'};
  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => height ?? '100%'};
  margin: ${({ margin }) => margin ?? 0};
  padding: ${({ padding }) => padding ?? 0};
`;
