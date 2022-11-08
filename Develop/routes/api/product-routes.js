// ALL LOWERCASE COMMENTS PROVIDED BY INSTRUCTOR, UPPERCASE COMMENTS BY ME
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data

  // *** MY CODE STARTS HERE
  // "FIND ALL" PRODUCTS USING ATTRIBUTES AND INCLUDE
  Product.findAll({
    include: [
      {
        // CATEGORY MODEL
        model: Category,
        attributes: ['id', 'category_name'],
      },
      {
        // TAG MODEL
        model: Tag,
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

  // "FIND ONE" PRODUCT USING ATTRIBUTES AND INCLUDE
  Product.findOne({
    where: {
      id: req.params.id
    }
  },
    {
      include: [
        {
          // CATEGORY MODEL
          model: Category,
          attributes: ['id', 'category_name'],
        },
        {
          // TAG MODEL
          model: Tag,
          attributes: ['id', 'tag_name'],
        },
      ],
    })

    .then((dbProductData) => {
      if (!dbProductData) {
        // 404 ERROR FOR NOT FOUND
        res.status(404).json({ message: 'There is no product found with that id' });
        return;
      }
      res.json(dbProductData);
    }
    )
    .catch((err) => {
      console.log(err);
      // 500 ERROR FOR A GENERIC SERVER ERROR
      res.status(500).json(err);
    }
    );
});


// create new product
//****** LINES 83-154 PROVIDED BY INSTRUCTOR.
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

  // ***** MY CODE BELOW
  // USE .DESTROY() TO DELETE A PRODUCT. CAN I USE .DELETE() INSTEAD????? ASK TUTOR/INSTRUCTOR
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbProductData) => {
      if (!dbProductData) {
        // 404 FOR NOT FOUND
        res.status(404).json({ message: 'There is no product with that id' });
        return;
      }
      res.json(dbProductData);
    })

    .catch((err) => {
      console.log(err);
      // 500 ERROR FOR A GENERIC SERVER ERROR
      res.status(500).json(err);
    });
});

module.exports = router;
