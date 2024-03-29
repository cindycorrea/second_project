const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'LEGO Builders',
    description: 'LEGO sets and Builders'
  },
  host: 'lastclassprojecttwo.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/builders.js', './routes/sets.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);