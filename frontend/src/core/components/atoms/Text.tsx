import styled from 'styled-components';

export type WeightProps = 'light' | 'normal' | 'bold' | 'extra-bold';

export interface TextProps {
  fontSize?: number;
  fontWeight?: WeightProps;
  fontColor?: string;
}

const getFontSize = (props) => () => {
  const { fontSize } = props;
  return fontSize ? `${fontSize}em` : '1em';
};

const getFontWeight = (props) => () => {
  const { fontWeight } = props;
  switch (fontWeight) {
    case 'light':
      return '200';
    case 'normal':
      return '400';
    case 'bold':
      return '600';
    case 'extra-bold':
      return '800';
    default:
      return '400';
  }
};

const getFontColor = (props) => () => {
  const { fontColor } = props;
  return fontColor || '#000';
};

const setDefaultValue = () => 'margin: 0px;padding: 0px;border:0';

export const Text = styled.p<TextProps>`
  font-size: ${getFontSize};
  font-weight: ${getFontWeight};
  color: ${getFontColor};
  ${setDefaultValue}
`;
