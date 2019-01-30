import { IPlugin } from "../interface";
import config from "../../config"
import * as Hapi from "hapi";



const register = async (server: Hapi.Server): Promise<void> => {
  try {

    const { swagger } = config;

    return server.register([
      require("inert"),
      require("vision"),
      {
        plugin: require("hapi-swagger"),
        options: swagger.options
      }
    ]);
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
