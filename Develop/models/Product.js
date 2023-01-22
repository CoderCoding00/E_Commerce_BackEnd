// LOWER CASE COMMENTS PROVIDED BY INSTRUCTOR

// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model { }

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    // MY CODE BELOW (USE PROVIDED README INFO)

    // ID COLUMN: INTEGER TYPE, DOESN'T ALLOW NULL VALUES, SET AS PRIMARY KEY, USES AUTOINCREMENT
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // PRODUCT_NAME COLUMN: STRING TYPE, DOESN'T ALLOW NULL VALUES
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // PRICE COLUMN: DECIMAL, DOESN'T ALLOW NULL VALUES, VALIDATES VALUE IS A DECIMAL
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    // STOCK COLUMN: INTEGER, DOESN'T ALLOW NULL VALUES, DEFAULT VALUE IS 10, VALIDATES VALUE IS NUMERIC
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    },
    // CATEGORY_ID COLUMN: INTEGER, REFERENCES THE CATEGORY MODEL'S ID
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
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
    modelName: 'product',
  }
);

module.exports = Product;
