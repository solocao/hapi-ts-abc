import * as Hapi from "hapi";
export interface IPluginInfo {
  name: string;
  version: string;
}

export interface IPlugin {
  // 注册插件
  register(server: Hapi.Server): Promise<void>;
  info(): IPluginInfo;
}