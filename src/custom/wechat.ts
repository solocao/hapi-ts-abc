exports.plugin = {

  name: '测试插件',
  version: 'sfasfe',
  once: true,
  multiple: false,

  register: (server, options) => {
    console.log('插件安装完毕')
  }
};