import bcryptjs from "bcryptjs";

class PasswordService {

  /**
   * @param {string} password
   * @param {string} passwordToCompare
   * @returns {Promise<*>}
   */
  validate = async (password, passwordToCompare) => {
    return await bcryptjs.compare(password, passwordToCompare);
  };

}

export default PasswordService;
