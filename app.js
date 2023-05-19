const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// ROUTER MIDDLEWARES

//
app.use((req, res) => {
  res.status(404).json({
    status: 'Failed',
    code: 404,
    message: 'Not Found',
  });
});

app.use((err, req, res, next) => {
  res.status(err.code || 500).json({
    status: 'Failed',
    code: err.code || 500,
    message: err.message || 'Internal Server Error',
  });
});
module.exports = app;
