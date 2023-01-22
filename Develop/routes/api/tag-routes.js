// LOWER CASE COMMENTS PROVIDED BY INSTRUCTOR, UPPER CASE COMMENTS BY ME
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  //*** MY CODE STARTS HERE
  // "FIND ALL" TAGS USING ATTRIBUTES AND INCLUDE
  Tag.findAll({
    // attributes: ['id', 'tag_name'],
    // attributes: ['tag_name'],
    include: [
      {
        model: Product,
        through: ProductTag,
        // attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
    // .THEN() METHOD TO RETURN JSON DATA
    // .then((dbTagData) => res.json(dbTagData))
    .then((tags) => res.json(tags))
    .then(() => {
      // DO A CONSOLE.LOG() TO SHOW IF IT WORED
      console.log('All data requested from Tag');
    })
    .catch((err) => {
      console.log(err);
      // 500 FOR GENERAL SERVER ERROR
      res.status(500).json(err);
    }
    );
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  // *** MY CODE STARTS HERE
  // "FIND ONE" TAG USING ATTRIBUTES AND INCLUDE
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        through: ProductTag,
        // attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
    .then((tags) => res.json(tags))
    .then(() => {
      // DO A CONSOLE.LOG() TO SHOW IF IT WORED
      console.log('All data requested from Tag');
    })
    .catch((err) => {
      console.log(err);
      // 500 FOR GENERAL SERVER ERROR
      res.status(500).json(err);
    }
    );
});
// .then((dbTagData) => {
//   if (!dbTagData) {
//     // 404 FOR NOT FOUND
//     res.status(404).json({ message: 'There is no tag found with that id' });
//     return;
//   }
//   res.json(dbTagData);
// })
//     .catch((err) => {
//       console.log(err);
//       // 500 FOR GENERAL SERVER ERROR
//       res.status(500).json(err);
//     });
// });

router.post('/', (req, res) => {
  // create a new tag

  // *** MY CODE STARTS HERE
  // CREATE A NEW TAG USING tag_name FROM req.body
  Tag.create({
    tag_name: req.body.tag_name,
  })
    //     .then((dbTagData) => res.json(dbTagData))
    //     .catch((err) => {
    //       console.log(err);
    //       // 500 FOR GENERAL SERVER ERROR
    //       res.status(500).json(err);
    //     });
    // });
    .then((tags) => res.json(tags))
    .then(() => {
      // DO A CONSOLE.LOG() TO SHOW IF IT WORED
      console.log('All data requested from Tag');
    })
    .catch((err) => {
      console.log(err);
      // 500 FOR GENERAL SERVER ERROR
      res.status(500).json(err);
    }
    );
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value

  // *** MY CODE STARTS HERE
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tags) => res.json(tags))
    .then(() => {
      // DO A CONSOLE.LOG() TO SHOW IF IT WORED
      console.log('All data requested from Tag');
    })
    .catch((err) => {
      console.log(err);
      // 500 FOR GENERAL SERVER ERROR
      res.status(500).json(err);
    }
    );
});
//     .then((dbTagData) => {
//       if (!dbTagData[0]) {
//         res.status(404).json({ message: 'There is no tag found with that id' });
//         return;
//       }
//       res.json(dbTagData);
//     })
//     .then(() => {
//       console.log('Tag Updated');
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value

  // *** MY CODE STARTS HERE
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tags) => res.json(tags))
    .then(() => {
      // DO A CONSOLE.LOG() TO SHOW IF IT WORED
      console.log('All data requested from Tag');
    })
    .catch((err) => {
      console.log(err);
      // 500 FOR GENERAL SERVER ERROR
      res.status(500).json(err);
    }
    );
});
//     .then((dbTagData) => {
//       if (!dbTagData) {
//         res.status(404).json({ message: 'There is no tag found with that id' });
//         return;
//       }
//       res.json(dbTagData);
//     })
//     .catch((err) => {
//       console.log(err);
//       // 500 FOR GENERAL SERVER ERROR
//       res.status(500).json(err);
//     });
// });

module.exports = router;
