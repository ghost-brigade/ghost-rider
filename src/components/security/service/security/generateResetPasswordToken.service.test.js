import GenerateResetPasswordTokenService from "./generateResetPasswordToken.service.js";

describe('generateResetPasswordToken', function () {
  it('should generate a reset password token', function () {
    const token = (new GenerateResetPasswordTokenService()).token;
    expect(typeof token).toBe('string');
  });

  it('should generate a reset password token with 36 characters', function () {
    const token = (new GenerateResetPasswordTokenService()).token;
    expect(token.length).toBe(36);
  });

  it('should generate a different reset password token', function () {
    const token = (new GenerateResetPasswordTokenService()).token;
    const lastToken = (new GenerateResetPasswordTokenService()).lastToken;
    expect(token).not.toBe(lastToken);
  });

  it('should reset the reset password token', function () {
    const generateResetPasswordTokenService = new GenerateResetPasswordTokenService();
    const token = generateResetPasswordTokenService.token;
    generateResetPasswordTokenService.resetToken();
    expect(generateResetPasswordTokenService.token).not.toBe(token);
  });

  it('should retrieve the last reset password token', function () {
    const generateResetPasswordTokenService = new GenerateResetPasswordTokenService();
    const token = generateResetPasswordTokenService.token;
    generateResetPasswordTokenService.resetToken();
    expect(generateResetPasswordTokenService.lastToken).toBe(token);
  });
});
