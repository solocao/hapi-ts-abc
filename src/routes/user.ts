import * as Joi from "joi";
export const routes = [
  {
    method: 'POST',
    path: '/user/login',
    options: {
      tags: ["api", "users"],
      description: '用户登录 分权限',
      auth: false,
      plugins: {
        'hapi-swagger': {
          payloadType: 'form'
        }
      },
      validate: {
        payload: Joi.object({
          name: Joi.string().required().description('账号名称'),
          password: Joi.string().required().description('密码'),
        })
      }
    },
    handler: () => {
      return 'aff'
    }
  },
];