const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Interweb",
      version: "1.0.0",
      description: "API Doc for interweb",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Local server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
