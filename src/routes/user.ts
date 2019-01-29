import * as Joi from "joi";
import * as Hapi from 'hapi';
import Logger from '../helper/logger';
import UserHandler from "../handlers/user";

export class Route {
  private server: Hapi.Server;
  constructor(server: Hapi.Server) {
    this.server = server;
  }
  public async register(): Promise<any> {
    return new Promise(resolve => {
      Logger.info('UserRoutes - Start adding user routes.');

      const userHandler = new UserHandler(this.server);
      this.server.bind(userHandler);

      this.server.route([
        {
          method: 'POST',
          path: '/user/login',
          options: {
            tags: ["api", "users"],
            description: '用户登录 分权限',
            auth: false,
            plugins: {
              'hapi-swagger': {
                payloadType: 'form'
              }
            },
            validate: {
              payload: Joi.object({
                name: Joi.string().required().description('账号名称'),
                password: Joi.string().required().description('密码'),
              })
            }
          },
          handler: userHandler.loginUser
        },
      ]);
      Logger.info('UserRoutes - Finish adding user routes.');
      resolve();
    });
  };
  public lala(): void {
    console.log('asfa');
  }
}
