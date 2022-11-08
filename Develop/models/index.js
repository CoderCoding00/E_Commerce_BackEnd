// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

// MY CODE BELOW (REFER TO SEEDS INFO FOR foreignKey NAMES)
Product.belongsTo(Category, {
  // USE FOREIGN KEY OF CATEGORY_ID SINCE PRODUCT BELONGS TO CATEGORY
  foreignKey: 'category_id',
});
// Categories have many Products

// MY CODE BELOW
Category.hasMany(Product, {
  // USE FOREIGN KEY OF CATEGORY_ID SINCE CATEGORY HAS MANY PRODUCTS
  foreignKey: 'category_id',
});

// Products belongToMany Tags (through ProductTag)

// MY CODE BELOW
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false,
  },
  // USE FOREIGN KEY OF PRODUCT_ID
  foreignKey: "product_id"
});

// Tags belongToMany Products (through ProductTag)

// MY CODE BELOW
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false,
  },
  // USE FOREIGN KEY OF TAG_ID
  foreignKey: "tag_id"
});

// CODE PROVIDED BY INSTRUCTOR BELOW
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

