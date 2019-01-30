import * as Hapi from "hapi";
import { IPlugin } from "../interface";
import config from "../../config";
import Weixin from './core';

const register = async (server: Hapi.Server): Promise<void> => {
  try {

    const weixin = new Weixin(config.weixin);
    // @ts-ignore
    server.decorate('toolkit', 'wx', weixin);

  } catch (err) {
    console.log(`Error registering swagger plugin: ${err}`);
  }
}

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: "Swagger Documentation", version: "1.0.0" };
    }
  };
};
