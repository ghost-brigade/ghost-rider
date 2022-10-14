import TokenService from "./token.service.js";
import config from "../../../../../config.js";

config.env();

const user = {
  id: 1,
  email: 'test@email.fr',
};

describe('TokenService', function () {
  it('should create a token', async () => {
    const token = await TokenService.create(user);
    console.log(token);
    expect(token).not.toBeNull();
  });

  it('should validate a token', async () => {
    const token = await TokenService.create(user);
    const decoded = await TokenService.validate(token);
    expect(decoded).not.toBeNull();
    expect(decoded).toEqual(user);
  });

  it('should not validate a token', async () => {
    const decoded = await TokenService.validate('test');
    expect(decoded).toBe(false);
  });

  it('create token from invalid user', async () => {
    try {
      await TokenService.create({});
    } catch (err) {
      expect(err.message).toBe('Invalid user no id or email');
    }
  });
});
