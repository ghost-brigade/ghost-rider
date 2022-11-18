class Guard {

  static ROLES_HIERARCHY = {
    ROLE_ADMIN: ['ROLE_USER'],
  };

  /**
   * Check if the user has role
   * @param {string|array} roles
   * @param {Object} user
   * @returns {boolean}
   */
  static isGranted(roles, user) {
    if (user === undefined) {
      return false;
    }

    if (typeof roles === 'string') {
      roles = [roles];
    }

    return roles.some((role) => {
      if (user.roles.includes(role)) {
        return true;
      }

      return this.ROLES_HIERARCHY[role]?.some((role) => user.roles.includes(role));
    });
  }
}

export default Guard;
