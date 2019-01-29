export default {
  swagger: {
    options: {
      jsonEditor: true,
      info: {
        title: "Task Api",
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
  };
