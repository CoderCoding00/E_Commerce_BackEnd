// ALL LOWER CASE COMMENTS PROVIDED BY INSTRUCTOR, UPPER CASE COMMENTS BY ME

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model { }

ProductTag.init(
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
    // PRODUCT ID COLUMN
    product_id: {
      type: DataTypes.INTEGER,
      // REFERENCES TO THE PRODUCT MODE & KEY ID
      references: {
        model: 'product',
        key: 'id',
      },
    },
    // TAG ID COLUMN
    tag_id: {
      type: DataTypes.INTEGER,
      // REFERENCES TO THE TAG MODEL & KEY ID
      references: {
        model: 'tag',
        key: 'id',
      },
    },
  },

  // CODE PROVIDED BY INSTRUCTOR BELOW
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
