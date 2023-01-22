const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns

    // ID COLUMN:
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
        model: "product",
        key: "id",
      },
    },
    // TAG_ID COLUMN: INTEGER, REFERENCES TAG MODEL'S ID
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        key: "id",
      },
    },
  },

  // TABLE CONFIGURATION OPTIONS (Check link for sequelize info) (https://sequelize.org/master/manual/model-basics.html#configuration))
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

module.exports = ProductTag;
