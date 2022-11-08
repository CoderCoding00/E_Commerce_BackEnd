// ALL LOWER CASE COMMENTS PROVIDED BY INSTRUCTOR, UPPER CASE COMMENTS BY ME

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model { }

Category.init(
  {
    // define columns

    // "ID" COLUMN"
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      // AUTO INCREMENT TO MAKE SURE IT'S A UNIQUE ID
      autoIncrement: true,
    },
    // "CATEGORY_NAME" COLUMN
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  // CODE PROVIDED BY INSTRUCTOR BELOW
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
