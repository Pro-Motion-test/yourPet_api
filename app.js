const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

const {
  authRouter,
  noticesRouter,
  petsRouter,
  friendsRouter,
  newsRouter,
} = require('./routes');

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// 503 ERROR // TECHNICAL SERVICING
app.use((req, res, next) => {
  console.log(req.get('X-Render-Deploy-Id'));
  next();
});
// ROUTER MIDDLEWARE
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/notices', noticesRouter);
app.use('/api/v1/pets', petsRouter);
app.use('/api/v1/friends', friendsRouter);
app.use('/api/v1/news', newsRouter);

app.use((req, res) => {
  res.status(404).json({
    status: 'Failed',
    code: 404,
    message: 'Not Found',
  });
});

app.use((err, req, res, next) => {
  console.log('statusCode', err);
  res.status(err.statusCode || 500).json({
    status: 'Failed',
    code: err.statusCode || 500,
    message: err.message || 'Internal Server Error',
  });
});
module.exports = app;
