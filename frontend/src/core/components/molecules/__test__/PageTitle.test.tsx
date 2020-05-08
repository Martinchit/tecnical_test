import React from 'react';
import { shallow } from 'enzyme';

import { PageTitle } from '../PageTitle';

describe('PageTitle', () => {
  const title = 'Test';
  it('renders correctly', () => {
    const wrapper = shallow(<PageTitle title={title} />);
    expect(wrapper).toMatchSnapshot();
  });
});
