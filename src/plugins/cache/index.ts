import * as Catbox from "catbox";

import * as CatBoxRedis from "catbox-redis";

import * as Boom from "boom";

import * as Hapi from "hapi";
import { IPlugin } from "../interface";


const register = async (server: Hapi.Server): Promise<any> => {
  try {

    return new Promise(async (resolve) => {
      console.log('aff')
      const cache = server.cache({ segment: 'countries', expiresIn: 60 * 60 * 1000 });


      resolve();

    }

    // const cache = server.cache({ segment: 'countries', expiresIn: 60 * 60 * 1000 });

    // console.log(cache)













    // const cache = server.cache({ segment: 'countries', expiresIn: 60 * 60 * 1000 });
    // await cache.set('norway', { capital: 'oslo' });
    // return new Promise(async (resolve) => {



    //   // server.cache() 

    //   // 
    //   // const value = cache.get('norway');
    //   // console.log(value)
    //   console.log('value')
    //   resolve();
    // });
    // return new Promise()=> { 
    // const value=  await cache.get('norway');


    // }


    // return server.cache({
    //   name: 'redisCache',
    //   engine: CatBoxRedis,
    //   host: '127.0.0.1',
    //   partition: 'cache',
    // });




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
