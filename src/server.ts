import * as Hapi from 'hapi';
import * as DotEnv from 'dotenv';

import Logger from './helper/logger';
import Plugin from './plugins';
import Router from './routes';
import * as Hoek from "hoek";

export default class Server {
    private static _instance: any;

    public static async start(): Promise<Hapi.Server> {
        try {
            DotEnv.config({
                path: `${process.cwd()}/.env`,

            });

            Server._instance = new Hapi.Server({
                // 端口
                port: process.env.PORT,
                cache: [
                    {
                        name: 'mongoCache',
                        engine: require('catbox-mongodb'),
                        host: '127.0.0.1',
                        partition: 'cache'
                    },
                    {
                        name: 'redisCache',
                        engine: require('catbox-redis'),
                        host: '127.0.0.1',
                        partition: 'cache'
                    }
                ]
            });
            // 注册插件
            await Plugin.registerAll(Server._instance);
            // 注册路由
            await Router.loadRoutes(Server._instance);

            await Server._instance.start();

            const redisCache = Server._instance.cache({ cache: 'redisCache', segment: 'examples17', expiresIn: 5 * 60 * 1000 });
            const mongoCache = Server._instance.cache({ cache: 'mongoCache', segment: 'examples17', expiresIn: 5 * 60 * 1000 });

            Server._instance.mongoCache = redisCache;
            Server._instance.redisCache = redisCache;

            Logger.info('Server - Up and running!');
            Logger.info(`Visit: http://${process.env.HOST}:${process.env.PORT}/api/users for REST API`);
            Logger.info(`Visit: http://${process.env.HOST}:${process.env.PORT}/documentation for Swagger docs`);

            return Server._instance;
        } catch (error) {
            Logger.info(`Server - There was something wrong: ${error}`);

            throw error;
        }
    }

    public static stop(): Promise<Error | void> {
        Logger.info(`服务终止!`);

        return Server._instance.stop();
    }

    public static async recycle(): Promise<Hapi.Server> {
        await Server.stop();
        return await Server.start();
    }

    public static instance(): Hapi.Server {
        return Server._instance;
    }

    public static async inject(options: string | Hapi.ServerInjectOptions): Promise<Hapi.ServerInjectResponse> {
        return await Server._instance.inject(options);
    }
}
