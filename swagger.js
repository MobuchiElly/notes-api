const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Notes API',
    description: 'Notes API documentation with JWT Auth using swagger-autogen',
    version: '1.0.0',
  },
  host: 'notes-api-wbz5.onrender.com',
  schemes: ['https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter your bearer token in the format: Bearer <token>',
    },
  },
  security: [{
    bearerAuth: [],
  }],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);