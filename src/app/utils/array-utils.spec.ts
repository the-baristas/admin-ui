import { ArrayUtils } from './array-utils';

describe('ArrayUtils', () => {
  it('should create an instance', () => {
    expect(new ArrayUtils()).toBeTruthy();
  });

  it('test makeArrayUnique', () => {
    const o1 = { field: "n", thing: "m" };
    const o2 = { field: "a", thing: "b" };
    const o3 = { field: "a", thing: "m" };

    let newArray = ArrayUtils.makeArrayUnique([o1, o2, o3], "field");

    expect(newArray.length).toEqual(2);
  });
});
