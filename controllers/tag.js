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
    schema.validate({
      name: req.body.name,
      description: req.body.description,
    })
  } catch (error) {
    return res.send(error);
  }

  try {
    Tags.create({
      name: req.body.name,
      description: req.body.description
    })
    res.send('New tag created');
  } catch (error) {
    return res.send(error);
  }
}

async function getTag(req, res) {
  const TagData = await Tags.findAll();
  res.send(TagData);
}

async function updateTag() {
  const id = req.params.id;

  const schema = Joi.object({
    name: Joi.string().min(4),
    description: Joi.string(),
  })

  try {
    schema.validate({
      name: req.body.name,
      description: req.body.description,
    })
  } catch (error) {
    return res.send(error);
  }

  try {
    await Tags.update({
      name: req.body.name,
      description: req.body.description,
    }, //what going to be updated
      { where: { id: id } } // where clause
    )
    res.send('Tag Updated');
  } catch (error) {
    return res.send(error);
  }

}


module.exports = { createTag, getTag, updateTag, Tag };
