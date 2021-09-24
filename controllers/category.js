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
    await schema.validate({
      name: req.body.name,
      description: req.body.description,
      slug: req.body.slug
    })
  } catch (error) {
    return res.send(error);
  }

  Categories.create({
    name: req.body.name,
    description: req.body.description,
    slug: req.body.slug
  })
  res.send('New category created');
}

async function getCategory(req, res) {
  const categoryData = await Categories.findAll();
  res.send(categoryData);
}


module.exports = { createCategory, getCategory, Category };
