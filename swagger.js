const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "User Management Api",
      description: "Simple user management api",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3002/",
        description: "Base url for the api ",
      },
    ],
  },
  apis: ["routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
