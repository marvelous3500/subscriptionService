'use strict';

const Sequelize = require("sequelize");
const sequelize = require("../util/database")

  const Plan = sequelize.define("Plan", {
    id: {
         type:Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true,
         allowNull:false
        },

    name:{
        type: Sequelize.STRING,
        allowNull: false,
      },

    price: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      createdAt:{
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
    });

    module.exports = Plan;
 

  // sequelize-cli db:migrate