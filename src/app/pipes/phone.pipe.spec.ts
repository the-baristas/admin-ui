import { PhonePipe } from './phone.pipe';

describe('PhonePipe', () => {
  it('create an instance', () => {
    const pipe = new PhonePipe();
    expect(pipe).toBeTruthy();
  });

  it('test pipe transform', () => {
    const pipe = new PhonePipe();
    const phone = "2123334444";
    expect(pipe.transform(phone)).toEqual("(212) 333-4444");
  })
});
