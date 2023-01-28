'use strict';

module.exports = (sequelize, DataTypes) => {
  let plan = sequelize.define(
    'plan',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      
      price: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
    
      name: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
     
    },
    {
      tableName: 'plan',
      freezeTableName: true,
    }
  );

  plan.associate = function(models) {
    plan.hasMany(models.subscription, 
    {
      foreignKey: 'id',
    as: 'Plan_pk',
    constraints: false
});   
}
  return plan
};

