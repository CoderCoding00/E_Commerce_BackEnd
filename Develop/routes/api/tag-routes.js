const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  //*** MY CODE STARTS HERE
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        // DO I NEED "id"?????
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        // ***** DO I NEED THIS LINE BELOW?????
        // through: ProductTag
      },
    ],
  })
    .then((dbTagData) => res.json(dbTagData))
    .then(() => {
      console.log('requested all data');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  // *** MY CODE STARTS HERE
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    // is tag_name needed here????
    // attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        // DO I NEED 'id'?????
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        // ***** DO I NEED THIS LINE BELOW?????
        // through: ProductTag
      },
    ],
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: 'There is no tag found with that id' });
        return;
      }
      res.json(dbTagData);
    }
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );
});

router.post('/', (req, res) => {
  // create a new tag

  // *** MY CODE STARTS HERE
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );
});

router.put('/test/:id', (req, res) => {
  // update a tag's name by its `id` value
  console.log('put connected found,', req.params.id);
  res.send('found', req.params.id);
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value

  // *** MY CODE STARTS HERE
  // Tag.update(
  //   {
  //     tag_name: req.body.tag_name,
  //   },
  //   {
  //     where: {
  //       id: req.params.id,
  //     },
  //   }
  // )

  // *****TRIED THIS BELOW INSTEAD OF THE ABOVE CODE
  // OR SHOULD IT BE tag_name: req.body.tag_name, ??????
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => {
      if (!dbTagData[0]) {
        res.status(404).json({ message: 'There is no tag found with that id' });
        return;
      }
      // CHANGED THIS TO CODE BELOW
      // res.status(200).send('Updated id');
      res.json(dbTagData);
    })
    .then(() => {
      console.log('updated tag');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value

  // *** MY CODE STARTS HERE
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: 'There is no tag found with that id' });
        return;
      }
      res.json(dbTagData);
    }
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    }
    );
});

module.exports = router;
