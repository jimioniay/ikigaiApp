import Sequelize from 'sequelize';
import mysql2 from 'mysql2';
import 'dotenv/config';

const options = {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql',
  dialectModule: mysql2,
};

const connection = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,
  options,
);

export default connection;
