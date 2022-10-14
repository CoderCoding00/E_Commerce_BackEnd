const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products

  // *** MY CODE STARTS HERE
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  // *** MY CODE STARTS HERE
  Category.findOne({
    where: {
      id: req.params.id,
    },
    // is category_name needed here????
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'There is no category found with that id' });
        return;
      }
      res.json(dbCategoryData);
    }
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );
});

router.post('/', (req, res) => {
  // create a new category

  // *** MY CODE STARTS HERE
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value

  // *** MY CODE STARTS HERE
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'There is no category found with that id' });
        return;
      }
      res.json(dbCategoryData);
    }
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value

  // *** MY CODE STARTS HERE
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'There is no category found with that id' });
        return;
      }
      res.json(dbCategoryData);
    }
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );
});

module.exports = router;
