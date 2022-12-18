const Sequelize = require("sequelize");
require("dotenv").config();

const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_DIALECT = process.env.DATABASE_DIALECT;
const DATABASE_HOST = process.env.DATABASE_HOST;

const  sequelize = new Sequelize( `${DATABASE_NAME}`, `${DATABASE_USER}`, `${DATABASE_PASSWORD}`,{
dialect: `${DATABASE_DIALECT}`

});

module.exports = sequelize;