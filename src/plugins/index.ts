import * as Hapi from 'hapi';
import * as fs from 'fs';
import * as Path from 'path';

import Config from '../config';
import Logger from '../helper/logger';

export default class Plugins {
    public static async status(server: Hapi.Server): Promise<Error | any> {
        try {
            Logger.info('Plugins - Registering status-monitor');

            await Plugins.register(server, {
                options: Config.status.options,
                plugin: require('hapijs-status-monitor'),
            });
        } catch (error) {
            Logger.info(`Plugins - Ups, something went wrong when registering status plugin: ${error}`);
        }
    }

    public static async swagger(server: Hapi.Server): Promise<Error | any> {
        try {
            Logger.info('Plugins - Registering swagger-ui');

            await Plugins.register(server, [
                require('vision'),
                require('inert'),
                {
                    options: Config.swagger.options,
                    plugin: require('hapi-swagger'),
                },
            ]);
        } catch (error) {
            Logger.info(`Plugins - Ups, something went wrong when registering swagger-ui plugin: ${error}`);
        }
    }

    public static async boom(server: Hapi.Server): Promise<Error | any> {
        try {
            Logger.info('Plugins - Registering hapi-boom-decorators');

            await Plugins.register(server, {
                plugin: require('hapi-boom-decorators'),
            });
        } catch (error) {
            Logger.info(`Plugins - Ups, something went wrong when registering hapi-boom-decorators plugin: ${error}`);
        }
    }

    public static async registerAll(server: Hapi.Server): Promise<Error | any> {

        // 读取插件存放的文件列表
        const files = fs.readdirSync(__dirname).filter(function (file) {
            return Path.extname(file).toLowerCase() === ''
        });

        files.forEach(async function (file) {
            // 加载指定插件
            const plugin = require(Path.join(__dirname, file)).default();
            await plugin.register(server);
            Logger.info(`注册插件--${plugin.info().name} v${plugin.info().version}`);
        })

        // 如果是开发者环境，需要swagger
        // if (process.env.NODE_ENV === 'development') {

        //     await Plugins.status(server);
        //     await Plugins.swagger(server);
        // }
        await Plugins.boom(server);
    }

    private static register(server: Hapi.Server, plugin: any): Promise<void> {
        Logger.debug('registering: ' + JSON.stringify(plugin));
        return new Promise((resolve, reject) => {
            server.register(plugin);
            resolve();
        });
    }
}
