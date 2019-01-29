import * as Hapi from "hapi";
import * as Boom from "boom";


export default class UserHandler {
  server: any;

  constructor(server: any) {
    this.server = server;
  }

  public async loginUser(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    await this.server.redisCache.set('111', 'asfasfaefea');
    const value = await this.server.redisCache.get('111');
    return value
  }
}
