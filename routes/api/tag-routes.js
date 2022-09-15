const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: {  
      model: Product,
      as: 'products'
    }
  }).then(tagsData => res.json(tagsData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })  
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      as: 'products'
    }
  }).then(tagData => {
    if(!tagData) {
      res.status(400).json({ message: "No tag found with this id" })
      return;
    }
    res.json(tagData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(createTagData => res.json(createTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })  
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    { 
      where: {
        id: req.params.id
      }
    }).then(updatedTagData => res.json(updatedTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })  
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(deleteTagData => {
    if (!deleteTagData) {
      res.status(400).json({ message: 'No tag with this id' });
      return; 
    }
    res.json({message: 'Tag deleted'})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
