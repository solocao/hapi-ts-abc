// 主动推送的消息
import { timeStamp } from '../helper';
import * as client from 'superagent';
export default class Msg {
  async send(templateId: string) {
    // const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}}`;
    // const menu = [
    //   {
    //     "type": "view",
    //     "name": "安全问题上报",
    //     "url": "http://wx.caowei.wang/#/report"
    //   }];
    // const data = await client.post(url).send({ button: menu }).catch(err => { console.log(err) });
    return '这是返回的text'
  };
}