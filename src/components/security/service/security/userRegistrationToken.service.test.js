import UserRegistrationTokenService from "./userRegistrationToken.service.js";
import config from "../../../../../config.js";

config.env();

describe('userRegistrationTokenService', function () {
  const userRegistrationTokenService = new UserRegistrationTokenService('test@email.fr');

  it('should generate a string token', function () {
    const token = userRegistrationTokenService.generate();
    expect(typeof token).toBe('string');
  });

  it('should verify a token', function () {
    const token = userRegistrationTokenService.generate();
    expect(userRegistrationTokenService.verify(token)).toBe(true);
  });

  it('should not verify a token', function () {
    expect(userRegistrationTokenService.verify('wrongToken')).toBe(false);
  });
});
