'use strict';
const Sequelize = require("sequelize");
const sequelize = require("../util/database")



  const Subscription = sequelize.define("subscription", {
    id: {
         type:Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true
        },

    name:{
        type: Sequelize.STRING,
        allowNull: false
      },

    type: {
      type: Sequelize.ENUM("DAILY", "MONTHLT", "YEARLY")
        
    },

    discription: {
        type: Sequelize.STRING,
        allowNull: false
      },

      status:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: sequelize.literal(true)
      },

      renew:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: sequelize.literal(false)
      },
    subsctiption_start: {
        type: 'TIMESTAMP',
        allowNull: true
      },

    subsctiption_end: {
        type: 'TIMESTAMP',
        allowNull: true
      },
      
      createdAt:{
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
    });
 
module.exports = Subscription;
  // sequelize-cli db:migrate