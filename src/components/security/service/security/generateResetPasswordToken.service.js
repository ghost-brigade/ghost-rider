import crypto from 'crypto';

class GenerateResetPasswordTokenService {
  lastToken = null;
  token = null;

  constructor() {
    this.#generateToken();
  }

  #generateToken = () => {
    if (this.token != null) {
      this.lastToken = this.token;
    }
    this.token = crypto.randomUUID();
  };

  resetToken = () => {
    this.#generateToken();
  };
}

export default GenerateResetPasswordTokenService;
