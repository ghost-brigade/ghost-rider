import fs from "fs";
import {dirname} from "path";
import {fileURLToPath} from "url";
import * as path from "path";

class RouterService {

  #baseDir = path.join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '/components');
  routes = {};

  async init(baseDir = this.#baseDir) {
    return await this.#load(baseDir);
  }

  /**
   * Load all file and put them in the routes object
   * @param baseDir
   * @returns {Promise<{}>}
   */
  #load = async (baseDir) => {
    return new Promise((resolve, reject) => {
      fs.readdir(baseDir, async (err, files) => {
        if (err) {reject(err);}
        resolve(files);
      });
    }).then(async (files) => {

      for (const file of files) {
        const path = baseDir + '/' + file;

        /**
         * If the file is a directory, we call the loader again
         */
        if (fs.statSync(path).isDirectory()) {
          await this.#load(path);
        } else {
          if (file.endsWith('.routes.js')) {
            const module = await import(path);

            if (module.default === undefined || module.default === null || typeof module.default !== 'object') {
              throw new Error('The file ' + file + ' must export a default routes object');
            }

            this.#validate(Object.entries(module.default));
            Object.assign(this.routes, module.default);
          }
        }
      }

      return this.routes;
    });
  };

  /**
   * Get all routes from a file
   * @param {Array} routes
   */
  #validate = (routes) => {
    for (const [key, value] of routes) {
      /* Prevent duplicate route name */
      if (Object.keys(this.routes).length > 0 && this.routes[key] !== undefined) {
        throw new Error('The route ' + key + ' already exists');
      }

      if (value.path === undefined || value.path === null || value.path === '') {
        throw new Error('The route ' + key + ' must have a path');
      }

      if (value.method === undefined || value.method === null || value.method === '') {
        throw new Error('The route ' + key + ' must have a method');
      }

      if (['get', 'post', 'put', 'delete', 'all'].includes(value.method.toLowerCase()) === false) {
        throw new Error("The method " + value.method + " is not allowed please use 'get', 'post' or 'all'");
      }

      if (value.controller === undefined || value.controller === null || typeof value.controller !== 'function') {
        throw new Error('The route ' + key + ' must have a controller defined');
      }

      /**
       * By default, if roles is not defined we set it with ROLE_USER role
       */
      if (value.roles === undefined) {
        value.roles = ['ROLE_USER'];
      }

      if (Array.isArray(value.roles) === false) {
        throw new Error('The roles value of route ' + key + ' must be an array');
      }

      if (value.middlewares === undefined) {
        value.middlewares = [];
      }

      if (Array.isArray(value.middlewares) === false) {
        throw new Error('The middlewares value of route ' + key + ' must be an array');
      }
    }
  };
}

export default RouterService;
