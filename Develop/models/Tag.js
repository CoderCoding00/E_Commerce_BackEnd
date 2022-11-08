// ALL LOWERCASE COMMENTS PROVIDED BY INSTRUCTOR, UPPERCASE COMMENTS BY ME

// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection.js');
// Initialize Product model (table) by extending off Sequelize
class Tag extends Model { }

Tag.init(
  {
    // define columns

    // MY CODE BELOW
    // ID COLUMN (USE SEEDS INFO TO NAME COLUMNS)
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      // AUTO INCREMENT TO MAKE SURE IT'S A UNIQUE ID
      autoIncrement: true,
    },
    // TAG NAME COLUMN
    tag_name: {
      // STRING DATA TYPE
      type: DataTypes.STRING,
    },
  },
  // CODE PROVIDED BY INSTRUCTOR BELOW
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
