const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      as: 'products'
    }
  }).then(categoriesData => res.json(categoriesData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })  
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        as: 'products',
      }
    ]
  }).then(categoryData => {
      if(!categoryData) {
        res.status(400).json({ message: "No category found with this id" });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then(createCategoryData => res.json(createCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    }) 
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    { 
      where: {
        id: req.params.id
      }
  }).then(categoryUpdatedData => res.json(categoryUpdatedData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(categoryDeleteData => {
      if (!categoryDeleteData) {
        res.status(400).json({ message: 'No category with this id' });
        return; 
      }
      res.json({message: 'Category deleted'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;
