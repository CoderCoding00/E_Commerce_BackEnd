// Model and DataTypres for Category table in database
const { Model, DataTypes } = require("sequelize");
// Sequlize connection
const sequelize = require("../config/connection.js");
// Category model extends Model class from Sequelize
class Category extends Model {}

Category.init(
  {
    // Define the columns

    // ID COLUMN:
    // INTEGER TYPE, DOESN'T ALLOW NULL VALUES
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // CATEGORY_NAME COLUMN:
    // STRING TYPE, DOESN'T ALLOW NULL VALUES
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  // TABLE CONFIGURATION OPTIONS (Check link for sequelize info) (https://sequelize.org/master/manual/model-basics.html#configuration))
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "category",
  }
);

module.exports = Category;
