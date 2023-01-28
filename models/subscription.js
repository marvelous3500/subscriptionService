'use strict';

module.exports = (sequelize, DataTypes) => {
  let subscription= sequelize.define(
    'subscription',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      plan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'plan',
          key: 'id'
        }
      },
     name:{
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    
      subsctiption_start: {
          type: DataTypes.DATE,
          allowNull: false
        },
        type: {
          type:DataTypes.ENUM('MONTHLY','DAYLY','YEARLY')
        },

        subsctiption_end: {
          type: DataTypes.DATE,
          allowNull: false
        },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default:true
      },
      password:{
        type: DataTypes.STRING,
        allowNull:true,
        set(value) {
          // Storing passwords in plaintext in the database is terrible.
          // Hashing the value with an appropriate cryptographic hash function is better.
          this.setDataValue('password', hash(value));
        }
      },
      renew: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      }
    },
    {
      tableName: 'subscription',
      paranoid: true,
     // timestamps:false,
    }
  );

  subscription.associate = (models) => {
    subscription.belongsTo(models.plan, {
      foreignKey: 'plan',
      as: 'plan_subscription',
      constraints: false
    });
  }

  //sequelize.sync({alter:true}) // force

  return subscription
};
