import {stub} from "sinon";
import AntispamRepository from "../../repository/antispam.repository.js";
import AntispamService from "./antispam.service.js";

const email = 'test@test';
const ip = '127.0.0.1';

const generateFakeAntispam = (row = 5) => {
  let fakeAntispamData = {};

  for (let i = 0; i < row; i++) {
    Object.assign(fakeAntispamData, {
      id: i,
      email: email,
      ip: ip,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return fakeAntispamData;
};

describe('AntispamService', function () {

  it('should authorize authentication request', async () => {

    /**
     * Stub the AntispamRepository
     * @type {AntispamRepository}
     */
    const antispamRepository = new AntispamRepository();
    stub(antispamRepository, 'findByIpAddrAndUserEmail').callsFake(async () => {
      return generateFakeAntispam(0);
    });

    const antispamService = new AntispamService(antispamRepository);
    expect(await antispamService.authorizeAuthenticationRequest(ip, email)).toBe(true);
  });

  it('should not authorize authentication request', async () => {

      /**
      * Stub the AntispamRepository
      * @type {AntispamRepository}
      */
      const antispamRepository = new AntispamRepository();
      stub(antispamRepository, 'findByIpAddrAndUserEmail').callsFake(async () => {
        return generateFakeAntispam(5);
      });

      const antispamService = new AntispamService(antispamRepository);
      await expect(antispamService.authorizeAuthenticationRequest(ip, email)).rejects.toThrow('You are banned please retry later');
  });

  it('should create antispam', async () => {

    const returnData = generateFakeAntispam(1);

    /**
     * Stub the AntispamRepository
     * @type {AntispamRepository}
     */
    const antispamRepository = new AntispamRepository();
    stub(antispamRepository, 'create').callsFake(async () => {
      return returnData;
    });

    const antispamService = new AntispamService(antispamRepository);
    expect(await antispamService.createAuthenticationAttemptError(ip, email)).toEqual(returnData);
  });
});
