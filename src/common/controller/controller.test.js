import Controller from "./controller.js";

describe('Default Controller', () => {
  it('should not be instantiated', () => {
    expect(() => new Controller()).toThrow('Abstract classes can\'t be instantiated.');
  });
});
