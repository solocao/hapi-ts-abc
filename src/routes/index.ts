import * as Hapi from 'hapi';
import IRoute from '../helper/route';
import Logger from '../helper/logger';
import * as Joi from "joi";

export class Routes implements IRoute {
  public async register(server: Hapi.Server): Promise<any> {
    return new Promise(resolve => {
      Logger.info('UserRoutes - Start adding user routes.');

      server.route([
        {
          method: 'POST',
          path: '/api/users',
          options: {
            description: 'Method that creates a new user.',
            tags: ['api', 'users'],
            auth: false,
            validate: {
              payload: Joi.object({
                name: Joi.string().required().description('账号名称'),
                password: Joi.string().required().description('密码'),
              })
            },
            handler: (request, h) => {
              return 'asfasf'
            }
          },
        }
      ]);
      Logger.info('UserRoutes - Finish adding user routes.');
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
