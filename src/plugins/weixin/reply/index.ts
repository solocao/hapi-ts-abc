import { timeStamp } from '../helper';
export default class Reply {
  // 返回文本
  text(toUser: string, fromUser: string, content: string) {
    const data = `<xml>
    <ToUserName><![CDATA[${toUser}]]></ToUserName>
    <FromUserName><![CDATA[${fromUser}]]></FromUserName>
    <CreateTime>${timeStamp()}</CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[${content}]]></Content>
    </xml>`;
    return data
  };
  // 返回文本
  image() {
    return '这是返回的text'
  };
  music() {
    return '这是返回的text'
  };
  news() {
    return '这是返回的text'
  };
  video() {
    return '这是返回的text'
  };
  voice() {
    return '这是返回的voice'
  }
}