const { Categories } = require('../models')
const { Model } = require('sequelize');
const Joi = require('joi');


class Category extends Model { }


async function createCategory(req, res) {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    description: Joi.string().required(),
    slug: Joi.string().required()
  })

  try {
    schema.validate({
      name: req.body.name,
      description: req.body.description,
      slug: req.body.slug
    })
  } catch (error) {
    return res.send(error);
  }

  try {
    await Categories.create({
      name: req.body.name,
      description: req.body.description,
      slug: req.body.slug
    })
    res.send('New category created');
  } catch (error) {
    return res.send(error);
  }

}

async function getCategory(req, res) {
  const categoryData = await Categories.findAll();
  res.send(categoryData);
}

async function updateCategory() {

  const id = req.params.id;

  const schema = Joi.object({
    name: Joi.string().min(4),
    description: Joi.string(),
    slug: Joi.string()
  })

  try {
    schema.validate({
      name: req.body.name,
      description: req.body.description,
      slug: req.body.slug
    })
  } catch (error) {
    return res.send(error);
  }

  try {
    await Categories.update({
      name: req.body.name,
      description: req.body.description,
      slug: req.body.slug
    }, //what going to be updated
      {
        where: { id: id }  // where clause
      })
    res.send('Category Updated');
  } catch (error) {
    return res.send(error);
  }

}


module.exports = { createCategory, getCategory, updateCategory, Category };
