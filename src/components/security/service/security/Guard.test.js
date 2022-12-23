import Guard from "./Guard.js";

describe('Guard', function () {
  it('should return false if user is undefined', function () {
    expect(Guard.isGranted('ROLE_USER', undefined)).toBe(false);
  });
  it('should return true if user has role', function () {
    expect(Guard.isGranted('ROLE_USER', {roles: ['ROLE_USER']})).toBe(true);
  });
  it('should return false if user has not role', function () {
    expect(Guard.isGranted('ROLE_USER', {roles: ['ROLE_ADMIN']})).toBe(false);
  });
  it('should return true if user has role in hierarchy', function () {
    expect(Guard.isGranted('ROLE_ADMIN', {roles: ['ROLE_USER']})).toBe(true);
  });
});
