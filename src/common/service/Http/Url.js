class Url {

  /**
   * Get the full url
   * @param req {Request}
   */
  static getFullUrl(req) {
    Url.getBaseUrl(req) + Url.getRelativeUrl(req);
  }

  /**
   * Get the full url
   * @param req {Request}
   */
  static getBaseUrl(req) {
    return req.protocol + '://' + req.hostname + ((process.env.PORT === 80 || process.env.PORT === 443) ? '' : ':' + process.env.PORT);
  }

  /**
   * Get the full url
   * @param req {Request}
   */
  static getRelativeUrl(req) {
    return req.originalUrl;
  }

}

export default Url;
