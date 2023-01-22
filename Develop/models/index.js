// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// ASSOCIATIONS (REFER TO GIVEN README FILE)
// (REFER TO SEEDS INFO FOR foreignKey NAMES)

// Products belongsTo Category
Product.belongsTo(Category, {
  // USE FOREIGN KEY OF CATEGORY_ID SINCE PRODUCT BELONGS TO CATEGORY
  foreignKey: "category_id",
});

// Categories have many Products
Category.hasMany(Product, {
  // USE FOREIGN KEY OF CATEGORY_ID SINCE CATEGORY HAS MANY PRODUCTS
  foreignKey: "category_id",
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false,
  },
  // USE FOREIGN KEY OF PRODUCT_ID
  foreignKey: "product_id",
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false,
  },
  // USE FOREIGN KEY OF TAG_ID SINCE TAG BELONGS TO MANY PRODUCTS
  foreignKey: "tag_id",
});

// EXPORT MODELS
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
