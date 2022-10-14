import PrismaRepository from "./prisma.repository.js";

describe('PrismaRepository', () => {
  it('should not be instantiated', () => {
    expect(() => new PrismaRepository()).toThrow('Abstract classes can\'t be instantiated.');
  });
});
