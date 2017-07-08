import { returnNum } from '../src/function'
import {} from 'jasmine';

describe("dummy test", () => {
  it("should be true", () => {
    expect(true).toBe(true);
  });

});

describe("returnNum", () => {
  it("should return 499", () => {
    expect(returnNum()).toEqual(499);
  })
})
