import * as Hapi from "hapi";
import { IPlugin } from "../interface";
import config from "../../config";
import Weixin from './core';
const parser = require('xml2json');

const register = async (server: Hapi.Server): Promise<void> => {
  try {
    // 返回微信工具对象
    const weixin = Weixin(config.weixin, ['user']);

    // @ts-ignore
    server.decorate('toolkit', 'wx', weixin);

    server.route({
      method: 'GET',
      path: '/wx',
      options: {
        tags: ['api'],
        description: '微信验证',
        auth: false,
      },
      handler: (request, h) => {
        const { query } = request;
        return weixin.tokenCheck(query)
      }
    });

    server.route({
      method: 'POST',
      path: '/wx',
      options: {
        tags: ['api'],
        description: '接收消息',
        auth: false,
      },
      handler: (request, h) => {
        const data = JSON.parse(parser.toJson(request.payload)).xml;
        console.log(data)
        // 定义参数
        const toUser = data.FromUserName;
        const fromUser = data.ToUserName;
        const content = '欢迎来到英雄联盟';
        const response = h.response(weixin.reply.text(toUser, fromUser, content));
        response.type('application/xml');
        return response;
      }
    });
    server.route({
      method: 'POST',
      path: '/send',
      options: {
        tags: ['api'],
        description: '发送模版消息测试',
        auth: false,
      },
      handler: async (request, h) => {

        const value = await h.wx.ggg();
        return value
        // return h.wx.sendTplMsg('CcjJA3nfkywssKig9Xlkd37gzOd3edjSiGa1QytpbwI');
      }
    });

    server.route({
      method: 'POST',
      path: '/test',
      options: {
        tags: ['api'],
        description: '发送模版消息测试',
        auth: false,
      },
      handler: async (request, h) => {
        // const value = await h.wx.batchGetUsers([
        //   "oFVpQ1qXJKr9eHD-JN0GnYjlOfQs",
        //   "oFVpQ1qGVmf4Vf0pCkLdEWsQiM2k",
        //   "oFVpQ1jjISnhtZ7lLE8H4uq0_2sc",
        //   "oFVpQ1nNWTl7F4Dyscx-ERu9oCvw",
        //   "oFVpQ1rzojDnj9Hb2eg1mb6V868Y"
        // ]);

        const value = await h.wx.getUser();



        return value
      }
    });



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
