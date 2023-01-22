// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection.js");
// Initialize Product model (table) by extending off Sequelize
class Tag extends Model {}

Tag.init(
  {
    // Define Columns

    // ID COLUMN:
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
  // TABLE CONFIGURATION OPTIONS (Check link for sequelize info) (https://sequelize.org/master/manual/model-basics.html#configuration))
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "tag",
  }
);

module.exports = Tag;
