// LOWERCASE COMMENTS PROVIDED BY INSTRUCTOR UPPERCASE COMMENTS BY ME
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products

  // *** MY CODE STARTS HERE
  // "FIND ALL" CATEGORIES USING ATTRIBUTES AND INCLUDE
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
    // .THEN() METHOD TO RETURN JSON DATA
    .then((dbCategoryData) => res.json(dbCategoryData))
    // .CATCH() METHOD TO RETURN ERROR
    .catch((err) => {
      console.log(err);
      // 500 ERROR FOR A GENERIC SERVER ERROR
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  // *** MY CODE STARTS HERE
  // "FIND ONE" CATEGORY USING ATTRIBUTES AND INCLUDE
  Category.findOne({
    where: {
      id: req.params.id,
    },

    include: [
      {
        model: Product,
        // attributes: ['id', 'category_name'],
        // attributes: ['product_name', 'price', 'stock', 'category_id'],
        attributes: ['category_name'],
      },
    ],
  })
    .then((dbCategoryData) => {
      // IF THERE IS NO CATEGORY FOUND THEN MESSAGE WITH ERRO
      if (!dbCategoryData) {
        // 404 ERROR FOR NOT FOUND
        res.status(404).json({ message: 'No category found with that id' });
        return;
      }
      res.json(dbCategoryData);
    }
    )
    .catch((err) => {
      console.log(err);
      // 500 ERROR FOR A GENERIC SERVER ERROR
      res.status(500).json(err);
    }
    );
});

router.post('/', (req, res) => {
  // create a new category

  // *** MY CODE STARTS HERE
  // "CREATE" A NEW CATEGORY
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      // 500 ERROR FOR A GENERIC SERVER ERROR
      res.status(500).json(err);
    }
    );
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value

  // *** MY CODE STARTS HERE
  // "UPDATE" A CATEGORY
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    // RETURN THE UPDATED CATEGORY DATA or ERROR IF NO CATEGORY FOUND W/ THAT ID
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        // 404 ERROR FOR NOT FOUND
        res.status(404).json({ message: 'No category with that id' });
        return;
      }
      res.json(dbCategoryData);
    }
    )
    // RETURN ERROR IF THERE IS ONE
    .catch((err) => {
      console.log(err);
      // 500 ERROR FOR A GENERIC SERVER ERROR
      res.status(500).json(err);
    }
    );
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value

  // CALL .destroy() ON CATEGORY MODEL TO DELETE CATEGORY DATA 
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        // 404 ERROR FOR NOT FOUND
        res.status(404).json({ message: 'There is no category found with that id' });
        return;
      }
      res.json(dbCategoryData);
    }
    )
    .catch((err) => {
      console.log(err);
      // 500 ERROR FOR A GENERIC SERVER ERROR
      res.status(500).json(err);
    }
    );
});

module.exports = router;
