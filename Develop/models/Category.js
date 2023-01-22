// ALL LOWER CASE COMMENTS PROVIDED BY INSTRUCTOR, UPPER CASE COMMENTS BY ME

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model { }

Category.init(
  {
    // define columns
    // MY CODE BELOW (USE PROVIDED README INFO)

    // ID COLUMN:
    // INTEGER TYPE, DOEN'T ALLOW NULL VALUES, SET AS PRIMARY KEY, USES AUTOINCREMENT
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // "CATEGORY_NAME" COLUMN: STRING TYPE, DOESN'T ALLOW NULL VALUES
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
