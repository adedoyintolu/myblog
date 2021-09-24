const { Tags } = require('../models')
const { Model } = require('sequelize');
const Joi = require('joi');

class Tag extends Model { }

async function createTag(req, res) {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    description: Joi.string().required(),
  })

  try {
    await schema.validate({
      name: req.body.name,
      description: req.body.description,
    })
  } catch (error) {
    return res.send(error);
  }

  Tags.create({
    name: req.body.name,
    description: req.body.description
  })

  res.send('New tag created');
}

async function getTag(req, res) {
  const TagData = await Tags.findAll();
  res.send(TagData);
}


module.exports = { createTag, getTag, Tag };
