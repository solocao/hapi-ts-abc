export default {
  swagger: {
    options: {
      jsonEditor: true,
      info: {
        title: "Task Api1",
        description: "Task Api Documentation",
        version: "1.0"
      },
      tags: [
        {
          name: "tasks",
          description: "Api tasks interface."
        },
        {
          name: "users",
          description: "Api users interface."
        }
      ],
      swaggerUI: true,
      documentationPage: true,
      documentationPath: "/documentation"
    },
    status: {
      options: {
        path: '/status',
        title: 'API Monitor',
        routeConfig: {
          auth: false,
        },
      },
    },
  },
  // 微信公众号的配置
  weixin: {
    appid: 'wxc00a6659e9953d62',
    secret: '2c741fab7f817bd6d9db1c8daa99acda',
    token: '0aa6510054c141a48e68f8277ff502e3',
    encodingAESKey: 'cY2fCtedFhpWYnjbpJxnOeOkUOyexksXTiQx5vlL7tE'
  }
}
