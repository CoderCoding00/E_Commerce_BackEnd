// ALL LOWER CASE COMMENTS PROVIDED BY INSTRUCTOR, UPPER CASE COMMENTS BY ME

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model { }

ProductTag.init(
  {
    // define columns

    // MY CODE BELOW

    // ID COLUMN: INTEGER, DOESN'T ALLOW NULL VALUES, SET AS PRIMARY KEY, USES AUTOINCREMENT
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // PRODUCT_ID COLUMN: INTEGER, REFERENCES PRODUCT MODEL'S ID
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id',
      },
    },
    // TAG_ID COLUMN: INTEGER, REFERENCES TAG MODEL'S ID
    tag_id: {
      type: DataTypes.INTEGER,
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
