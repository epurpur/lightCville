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
   
   WATTS : {
     type: DataTypes.INTEGER,
     
   },

   DECAL_COLO:{
     type: DataTypes.STRING,

   },
   DECAL_NUMB:{
     type : DataTypes.STRING,
   },
   MOUNT_HEIG:{
     type:DataTypes.INTEGER,
   },
   OWNER:{
     type:DataTypes.NULL,
     allowNull: true,
   },
  
   INTSTALL_DA:{
     type: DataTypes.DATE,
   
   },
   
    STYLE:{
      type: DataTypes.STRING,
    },
    WORK_EFFEC:{
      type: DataTypes.DATE,
    },
    LUMENS:{
      type:DataTypes.INTEGER,
    },
    CONTRACT_N:{
      type:DataTypes.INTEGER,
    },
    NOM_VOLT:{
      type:DataTypes.INTEGER,
    },
    BASE_COLOR:{
      type :DataTypes.NULL,
     allowNull:true, 
    },
   LATITUDE:{
     type:DataTypes.INTEGER,
   },
   LONGITUDE:{
     type:DataTypes.INTEGER,
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
