const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();

const { authRouter, noticesRouter } = require('./routes');

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// ROUTER MIDDLEWARE
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/notices', noticesRouter);
// app.use("/api/v1/pet",petRouter);
//
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
