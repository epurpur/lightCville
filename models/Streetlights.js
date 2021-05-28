const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Streetlights extends Model {}

Streetlights.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    watts : {
      type: DataTypes.INTEGER,
    },
    decal_colo:{
      type: DataTypes.STRING,
    },
    decal_numb:{
      type : DataTypes.STRING,
    },
    mount_heig:{
      type:DataTypes.INTEGER,
    },
    owner:{
      type:DataTypes.STRING,
      allowNull: true,
    },
    install_da:{
      type: DataTypes.DATE,
    },
    style:{
      type: DataTypes.STRING,
    },
    work_effec:{
      type: DataTypes.DATE,
    },
    lumens:{
      type:DataTypes.INTEGER,
    },
    contract_n:{
      type:DataTypes.INTEGER,
    },
    nom_volt:{
      type:DataTypes.INTEGER,
    },
    base_colo:{
      type :DataTypes.STRING,
    },
    latitude:{
      type:DataTypes.DECIMAL(10, 8),
    },
    longitude:{
      type:DataTypes.DECIMAL(10, 8),
   },
  },
  
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'streetlights',
  }
);

module.exports = Streetlights;
