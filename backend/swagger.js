// backend/swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MyTasks API",
      version: "1.0.0",
      description: "API MyTasks avec Auth et CRUD des tâches",
    },
    servers: [
      { url: "http://localhost:5002" }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.join(__dirname, "./routes/*.js")], // ✅ chemin corrigé
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };
