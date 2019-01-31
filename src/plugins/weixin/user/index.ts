
import * as client from 'superagent';
/**
 * 获取用户列表
 */
const getUser = async function () {
  // @ts-ignore
  const access_token = await this.getGlobalToken();
  const next_openid = null;
  let url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${access_token}`;
  const result = await client.get(url).catch(err => { console.log(err) });
  // @ts-ignore
  const data = JSON.parse(result.text);
  return data;
};

/**
 * 获取用户基本信息（包括UnionID机制）
 */
const getUserInfo = async function (openid: string) {
  // @ts-ignore
  const access_token = await this.getGlobalToken();
  let url = `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${access_token}&openid=${openid}&lang=zh_CN`;
  const result = await client.get(url).catch(err => { console.log(err) });
  // @ts-ignore
  const data = JSON.parse(result.text);
  return data;
};

/**
 * 批量获取用户信息
 */
const batchGetUsers = async function (openids: string[]) {
  // @ts-ignore
  const access_token = await this.getGlobalToken();
  let url = `https://api.weixin.qq.com/cgi-bin/user/info/batchget?access_token=${access_token}`;
  const payload = {
    user_list: openids.map(function (openid) {
      return { openid, "lang": "zh_CN" };
    })
  };
  const result = await client.post(url).send(payload).catch(err => { console.log(err) });
  // @ts-ignore
  const data = JSON.parse(result.text);
  return data;
};

export async function load(WX: any) {
  // 扩展WX类方法
  interface WX {
    getUser(): any;
    getUserInfo(): any;
    batchGetUsers(): any;
  }

  WX.prototype.getUser = getUser;
  WX.prototype.getUserInfo = getUserInfo;
  WX.prototype.batchGetUsers = batchGetUsers;

};





