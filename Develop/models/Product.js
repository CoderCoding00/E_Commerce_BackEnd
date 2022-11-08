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

    // MY CODE BELOW (USE SEEDS INFO TO NAME COLUMNS)
    // ID COLUMN
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // PRODUCT NAME COLUMN
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // PRICE COLUMN (USE DECIMAL(10,2) TO STORE FLOATING POINT VALUES)))
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      // VALIDATE IT'S A DECIMAL
      validate: {
        isDecimal: true,
      },
    },
    // STOCK COLUMN (USE INTEGER TO STORE INTEGER VALUES) (USE DEFAULT VALUE OF 10)
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      // VALIDATE IT'S NUMERIC
      validate: {
        isNumeric: true,
      },
    },
    // CATEGORY ID COLUMN
    category_id: {
      type: DataTypes.INTEGER,
      // REFERENCES THE CATEGORY MODEL'S AND ID
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
