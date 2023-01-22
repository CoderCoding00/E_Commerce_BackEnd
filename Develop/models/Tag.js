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
    // ID COLUMN: INTEGER TYPE, DOESN'T ALLOW NULL VALUES, SET AS PRIMARY KEY, USES AUTOINCREMENT
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // TAG_NAME COLUMN: STRING TYPE.
    tag_name: {
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
