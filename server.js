const app = require('./app');

const db = require('./db/connection');
const { startEngine } = require('./config');
startEngine(db);
