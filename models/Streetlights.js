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
      allowNull: true,
    },
    decal_colo:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    decal_numb:{
      type : DataTypes.STRING,
      allowNull: true,
    },
    mount_heig:{
      type:DataTypes.INTEGER,
      allowNull: true,
    },
    owner:{
      type:DataTypes.STRING,
      allowNull: true,
    },
    install_da:{
      type: DataTypes.DATE,
      allowNull: true,
    },
    style:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    work_effec:{
      type: DataTypes.DATE,
      allowNull: true, 
    },
    lumens:{
      type:DataTypes.INTEGER,
      allowNull: true,
    },
    contract_n:{
      type:DataTypes.INTEGER,
      allowNull: true,
    },
    nom_volt:{
      type:DataTypes.INTEGER,
      allowNull: true,
    },
    base_colo:{
      type: DataTypes.STRING,
      allowNull: true,
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
