import * as _ from 'lodash';
import * as client from 'superagent';
import sha1 = require('sha1');
import { randomString, timeStamp } from '../helper';
import { Options, JsConfigOptions, JsConfig, AccessToken, UserInfo, FansInfo, MediaData } from '../index.d';
import * as Path from 'path';

import Reply from '../reply';
import Msg from '../msg';

const Weixin = class Weixin {
  options: Options;
  _globalToken: string;
  _globalTokenTime: number;
  _jsapiTicket: string;
  _jsapiTicketTime: number;
  reply: any;
  msg: any;

  constructor(options?: Options) {
    this.options = options || {} as Options;
    if (!this.options.channel) {
      this.options.channel = 'jssdk';
    }
    this.reply = new Reply();
    this.msg = new Msg();

    // interface Weixin {
    //   logit(): any;
    // };

    // Weixin.prototype.logit = function () {
    //   console.log('asfasfafa');
    // }





  }

  setOptions(options: Options) {
    _.assign(this.options, options);
  };

  greet() {
    console.log('哈哈哈囖囖囖囖')
  };

  // 微信公众号 服务器接入检测
  tokenCheck(query: any) {
    const token = this.options.token;
    const { signature, nonce, timestamp, echostr } = query;
    const str = [token, timestamp, nonce].sort().join('');
    const sha = sha1(str);
    if (sha === signature) {
      return echostr;
    } else {
      return false;
    }
  };

  /**
   * 获取全局访问token
  */
  async getGlobalToken(): Promise<string> {
    if (this._globalToken && Date.now() < this._globalTokenTime) {
      return this._globalToken;
    }
    let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.options.appid}&secret=${this.options.secret}`;
    const data = await client.get(url).catch(err => { console.log(err) });
    const text = data.text;
    //                     失效时间
    const { access_token, expires_in } = JSON.parse(text);
    this._globalToken = access_token;
    this._globalTokenTime = Date.now() + expires_in * 1000 - 5000;
    return this._globalToken;
  }

  /**
   * 获取全局访问Ticket
   */
  async getTicket(): Promise<string> {
    if (this._jsapiTicket && Date.now() < this._jsapiTicketTime) {
      return this._jsapiTicket;
    }
    let token = await this.getGlobalToken();
    let url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`;
    let data = await client.get(url);
    const text = data.text;
    const { ticket, expires_in } = JSON.parse(text);
    this._jsapiTicket = ticket;
    this._jsapiTicketTime = Date.now() + expires_in * 1000;
    return this._jsapiTicket;
  }

  /**
   * 获取公众号h5平台 JSSDK Config
   * @param options url
   */
  async getJsConfig(options: string | JsConfigOptions): Promise<JsConfig> {
    if (typeof options === 'string') {
      options = { url: options };
    }
    let data: any = {
      jsapi_ticket: '',
      noncestr: randomString(),
      timestamp: timeStamp(),
      url: options.url
    };

    data.jsapi_ticket = await this.getTicket();

    let arr: string[] = _.map(data, (value, key) => `${key}=${value}`);

    data.signature = sha1(arr.join('&'));
    data.appId = this.options.appid;
    data.nonceStr = data.noncestr;
    data.jsApiList = options.jsApiList || [
      'checkJsApi',
      'updateAppMessageShareData',
      'updateTimelineShareData',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone',
      'startRecord',
      'stopRecord',
      'onVoiceRecordEnd',
      'playVoice',
      'pauseVoice',
      'stopVoice',
      'onVoicePlayEnd',
      'uploadVoice',
      'downloadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'translateVoice',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'closeWindow',
      'scanQRCode',
      'chooseWXPay',
      'openProductSpecificView',
      'addCard',
      'chooseCard',
      'openCard'
    ];
    if (options.debug) {
      data.debug = true;
    }
    delete data.jsapi_ticket;
    delete data.noncestr;
    delete data.url;
    return data;
  }

  /**
   * 获取用户 AccessToken
   * @param code
   */
  async getAccessToken(code: string): Promise<AccessToken> {
    let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${this.options.appid}&secret=${this.options.secret}&code=${code}&grant_type=authorization_code`;
    if (this.options.channel === 'wxapp') {
      // 小程序平台
      url = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.options.appid}&secret=${this.options.secret}&js_code=${code}&grant_type=authorization_code`;
    }
    let data = await client.get(url);
    const text = data.text;
    return JSON.parse(text);
  }

  /**
   * 获取用户信息，小程序平台不可用
   * @param openid
   * @param access_token
   */
  async getUserInfo(openid: string, access_token: string): Promise<UserInfo> {
    let url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}`;
    let data = await client.get(url);
    const text = data.text;
    return JSON.parse(text);
  }

  /**
   * 获取公众号关注者信息
   * @param openid
   * @param access_token
   */
  async getFansInfo(openid: string): Promise<FansInfo> {
    let token = await this.getGlobalToken();
    let url = `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${token}&openid=${openid}&lang=zh_CN`;
    let data = await client.get(url);
    const text = data.text;
    return JSON.parse(text);
  }

  // 发送自定义模版消息
  async sendTplMsg(template_id: string) {
    let access_token = await this.getGlobalToken();
    const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`;
    const payload = {
      touser: "oFVpQ1qGVmf4Vf0pCkLdEWsQiM2k",
      template_id: template_id,
      url: "http://weixin.qq.com/download",
      topcolor: "#FF0000",
      data: {
        first: {
          value: '您的网站业务系统()已经被上传WEBSHELL，服务器已经被攻击者控制，业务系统面临服务中断、数据泄露、被篡改的风险，需要立刻清除。',
          color: "#173177"
        },
        keyword1: {
          value: '祝大家猪年快乐',
          color: "#173177"
        },
        keyword2: {
          value: '2019-01-31 10:03:37',
          color: "#173177"
        },
        remark: {
          value: '请尽快处理。',
          color: "#173177"
        },
      }
    }
    const data = await client.post(url).send(payload).catch(err => { console.log(err) });
    // @ts-ignore
    const result = JSON.parse(data.text);
    return result
  }
}



export default (config: any, ext: string[]) => {

  // Object.keys(user).map((x) => {
  //   console.log(x)
  // })


  const user = require(Path.join(__dirname, '../user'));
  user.load(Weixin);

  return new Weixin(config);
};
