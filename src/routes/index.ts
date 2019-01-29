import * as Hapi from 'hapi';
import * as fs from 'fs';
import * as Path from 'path';
import IRoute from '../helper/route';
import Logger from '../helper/logger';
// import Route from './user'
export class Routes implements IRoute {
  public async register(server: Hapi.Server): Promise<any> {
    return new Promise(resolve => {
      const files = fs.readdirSync(__dirname).filter(function (file) {
        return Path.extname(file).toLowerCase() === '.js' && file !== 'index.js'
      });
      files.forEach(async function (file) {
        const { Route } = await import(Path.join(__dirname, file));
        new Route(server).register();
      })
      resolve();
    });
  }
}
export default class Router {
  public static async loadRoutes(server: Hapi.Server): Promise<any> {
    Logger.info('路由 - 开始加载路由');
    await new Routes().register(server);
    Logger.info('路由 - 路由加载完毕');
  }
}
