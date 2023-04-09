const { DataTypes, UUID } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    img: {
      type: DataTypes.STRING,
    },
    hp: {
      type: DataTypes.STRING
    },
    attack: {
      type: DataTypes.STRING
    },
    defense: {
      type: DataTypes.STRING
    },
    speed: {
      type: DataTypes.STRING
    },
    height: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.STRING
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
};
