
import * as Boom from "boom";

import * as Hapi from "hapi";
import { IPlugin } from "../interface";


const register = async (server: Hapi.Server): Promise<any> => {
  try {


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
