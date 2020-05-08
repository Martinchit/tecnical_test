import React from 'react';
import { FlexBox } from '../atoms/FlexBox';
import { Text } from '../atoms/Text';

interface PageTitleProps {
  title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => (
  <FlexBox flexDirection="column">
    <Text fontWeight="bold" fontSize={2.5}>
      {title}
    </Text>
  </FlexBox>
);
