const knex = require('knex');
const knexfile = require('./knexfile');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const environment = process.env.NODE_ENV || 'development';

const db = knex(knexfile[environment]);

module.exports = db;