'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('subscription', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM('MONTHLY','DAYLY','YEARLY')
      },
      discription: {
        type: Sequelize.STRING
      },
      renew: {
        type: Sequelize.BOOLEAN
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      subsctiption_start: {
        type: Sequelize.DATE
      },
      subsctiption_end: {
        type: Sequelize.DATE
      },
      planId: {
        type: Sequelize.INTEGER,
          references: {
          model: 'plan',
          key: 'id'
          }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('subscription');
  }
};