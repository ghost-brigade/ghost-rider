import jwt from "jsonwebtoken";

class TokenService {

  /**
   * Create a token for a user
   * @param {Object} user
   * @returns {Promise<*>}
   */
  create = async (user) => {
    if (user.id === undefined || user.email === undefined) {
      throw new Error("Invalid user no id or email");
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    return await jwt.sign(payload, process.env.SECRET, {
      expiresIn: "48h",
    });
  };

  /**
   * Check if a token is valid
   * @param {String} token
   * @returns {Promise<{firstname, roles: ([string]|[string]|[string]|*), name: (string|*), id, email}|boolean>}
   */
  validate = async (token) => {
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      return {
        id: decoded.id,
        email: decoded.email,
      };
    } catch (error) {
      return false;
    }
  };
}

export default TokenService;
