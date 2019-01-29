
import * as Boom from "boom";

import * as Hapi from "hapi";
import { IPlugin } from "../interface";
import * as Path from 'path';


const register = async (server: Hapi.Server): Promise<void> => {
  try {

    // const plugin = require(Path.join(__dirname, '../../custom/i')).default();
    // console.log(plugin)

    return server.register([
      {
        plugin: require("../../custom/wechat"),

      }
    ]);

  } catch (err) {
    console.log(`Error registering logger plugin: ${err}`);
    throw err;
  }
};

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: "Good Logger", version: "1.0.0" };
    }
  };
};
