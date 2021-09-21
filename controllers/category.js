const { Categories } = require('../models')
const { Model } = require('sequelize');
const Joi = require('joi');
const express = require('express')


class Category extends Model { }

app.post('/categories', async function (req, res) {

  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    description: Joi.string().required(),
    slug: Joi.string().required()
  })

  // await Categories.create({
  //   name: req.body.name,
  //   description: req.body.description,
  //   slug: req.body.slug
  // });

  try {
    await schema.validateAsync(Categories.create({
      name: req.body.name,
      description: req.body.description,
      slug: req.body.slug
    }))
  } catch (error) {
    return error;
  }
  res.send('New category created')
})



app.get('/categories', async function (req, res) {
  const categoryData = await Categories.findAll();
  res.send(categoryData);
})


module.exports = { Category };
