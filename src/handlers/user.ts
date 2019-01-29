import * as Hapi from "hapi";
import * as Boom from "boom";


export default class UserHandler {
  server: Hapi.Server;


  constructor(server: Hapi.Server) {
    this.server = server;
  }

  public async loginUser(request: Hapi.Request, h: Hapi.ResponseToolkit) {

    console.log(this.server.app.redisCache)

    await this.server.app.redisCache.set('111', { asf: '666' });
    const value = await this.server.app.redisCache.get('111');
    console.log(value);


    return value
  }
}
