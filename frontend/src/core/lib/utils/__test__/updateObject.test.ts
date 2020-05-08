import { updateObject } from '../updateObject';

describe('updateObject function', () => {
  it('renders result', () => {
    const newObj = updateObject({ a: 1 }, { a: 2, b: 1 });
    expect(newObj).toEqual({ a: 2, b: 1 });
  });
});
