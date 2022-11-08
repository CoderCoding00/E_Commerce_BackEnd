// ALL CODE HERE WAS PROVIDED BY INSTRUCTOR
const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

// END POINTS THAT ARE USED IN Insomnia (http://localhost:3001/api/categories) 
// WHERE /categories, /products, /tags ARE THE END POINTS.    
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

module.exports = router;


