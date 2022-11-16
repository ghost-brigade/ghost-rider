import moment from "moment";
import TokenValidityService from "./tokenValidity.service.js";

describe('tokenService', function () {
  const tokenService = new TokenValidityService();

  describe('Check if token is valid', function () {
    it('should return an invalid token 61min', function () {
      tokenService.token = {createdAt: moment().subtract(61, 'minutes').format()};
      expect(tokenService.isValid()).toBe(false);
    });

    it('should return an invalid token 60min', function () {
      tokenService.token = {createdAt: moment().subtract(60, 'minutes').format()};
      expect(tokenService.isValid()).toBe(false);
    });

    it('should return a valid token 30min', function () {
      tokenService.token = {createdAt: moment().subtract(30, 'minutes').format()};
      expect(tokenService.isValid()).toBe(true);
    });

    it('should return a valid token 1min', function () {
      tokenService.token = {createdAt: moment().subtract(1, 'minutes').format()};
      expect(tokenService.isValid()).toBe(true);
    });

    it('should return a valid token 59min', function () {
      tokenService.token = {createdAt: moment().subtract(59, 'minutes').format()};
      expect(tokenService.isValid()).toBe(true);
    });
  });

  describe('Check if token is authorized to request', function () {
    it('should return true after 61 min', function () {
      tokenService.token = {createdAt: moment().subtract(61, 'minutes').format()};
      expect(tokenService.isAuthorizedToRequest()).toBe(true);
    });

    it('should return false after 60 min', function () {
      tokenService.token = {createdAt: moment().subtract(60, 'minutes').format()};
      expect(tokenService.isAuthorizedToRequest()).toBe(false);
    });

    it('should return false after 59 min', function () {
      tokenService.token = {createdAt: moment().subtract(59, 'minutes').format()};
      expect(tokenService.isAuthorizedToRequest()).toBe(false);
    });

    it('should return false after 30 min', function () {
      tokenService.token = {createdAt: moment().subtract(30, 'minutes').format()};
      expect(tokenService.isAuthorizedToRequest()).toBe(false);
    });

    it('should return false after 1 min', function () {
      tokenService.token = {createdAt: moment().subtract(1, 'minutes').format()};
      expect(tokenService.isAuthorizedToRequest()).toBe(false);
    });
  });
});
