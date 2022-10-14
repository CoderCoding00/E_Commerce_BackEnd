const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data


  // *** MY CODE STARTS HERE
  Product.findAll({
    // ***** DO I NEED THE LINE BELOW????
    // attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    include: [
      {
        model: Category,
        // **** ADDED 'id'
        attributes: ['id', 'category_name'],
      },
      {
        model: Tag,
        // **** ADDED 'id'
        attributes: ['id', 'tag_name'],
      },
    ],
  })
    .then((dbProductData) => res.json(dbProductData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data

  // *** MY CODE STARTS HERE
  Product.findOne({
    where: {
      id: req.params.id
    }
  },
    {
      // ****** DO I NEED THIS LINE BELOW?????
      // attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      include: [
        {
          model: Category,
          // ***** ADDED 'id'
          attributes: ['id', 'category_name'],
        },
        {
          model: Tag,
          // ***** ADDED 'id'
          attributes: ['id', 'tag_name'],
        },
      ],
    })
    // .then((dbProductData) => res.json(dbProductData))
    // .catch((err) => {
    //   console.log(err);
    //   res.status(500).json(err);
    // }
    // );
    // *** NEW CODE 
    .then((dbProductData) => {
      if (!dbProductData) {
        res.status(404).json({ message: 'There is no product found with that id' });
        return;
      }
      res.json(dbProductData);
    }
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );
});


// create new product
// CODE BELOW PROVIDED BY THE INSTRUCTOR
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)

    //**** I ADDED THE CODE BELOW AFTER TUTOR SESSION FAIL 
    // ****TO TEST IF IT IS NEEDED AND GETS RID OF ERRORS
    // Product.create({
    //   product_name: req.body.product_name,
    //   price: req.body.price,
    //   stock: req.body.stock,
    //   category_id: req.body.category_id,
    //   tagIds: req.body.tag_id,
    // })

    // CODE PROVIDED BY THE INSTRUCTOR
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  // MY CODE BELOW
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbProductData) => {
      // *** COMMENTED OUT THE LINE BELOW and USED !dbProductData
      // .then((product) => {
      if (!dbProductData) {
        // *** COMMENTED OUT THE LINE BELOW
        // if (!product) {
        res.status(404).json({ message: 'There is no product with this id' });
        return;
      }
      res.json(dbProductData);
      // **** COMMENTED OUT THE LINE BELOW
      // res.json(product);
    }
    )
    // **** COMMENTED OUT THE LINE BELOW
    // .catch((err) => res.json(err));
    // **** REPLACED WITH THE CODE BELOW
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
