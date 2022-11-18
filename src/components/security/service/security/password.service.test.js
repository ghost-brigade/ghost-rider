import PasswordService from "./password.service.js";

describe('passwordService', function () {
  const passwordService = new PasswordService();

  it('should return a password', async function () {
    const password = await passwordService.hash('password');
    expect(password).not.toBeNull();
  });

  it('should return true if password is valid', async function () {
    const password = await passwordService.hash('password');
    const isValid = await passwordService.validate('password', password);
    expect(isValid).toBeTruthy();
  });
});
