import path, {dirname} from "path";
import {fileURLToPath} from "url";
import RouterService from "../../../../src/common/service/router/router.service.js";

const currentPath = path.join(dirname(fileURLToPath(import.meta.url)));

let obj = {
  'test': {
    path: '/test',
    method: 'get',
    controller: function () {},
    auth: true,
    roles: ['ROLE_USER']
  },
  'test2': {
    path: '/test2',
    method: 'all',
    controller: function () {},
    auth: false,
    roles: []
  }
};

describe('RouterService', () => {
  test('normal execution', async () => {
    const routerService = new RouterService();
    await routerService.init(currentPath + '/tests/normal_case').then((routes) => {
      expect(JSON.stringify(routes)).toMatch(JSON.stringify(obj));
    });
  });

  test('no default export', async () => {
    const routerService = new RouterService();
    await expect(routerService.init(currentPath + '/tests/no_default_export')).rejects.toThrow('The file test.routes.js must export a default routes object');
  });
});



