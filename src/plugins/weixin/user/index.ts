
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

export async function load(WX: any) {
  // 扩展WX类方法
  interface WX {
    getUser(): any;
  }
  WX.prototype.getUser = getUser
};





