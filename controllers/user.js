const { Users } = require('../models')
const { Model } = require('sequelize');
const Joi = require('joi');

class User extends Model { }

async function createUser(req, res) {
  const schema = Joi.object({
    first_name: Joi.string().min(4).required(),
    last_name: Joi.string().required(),
    email_address: Joi.string().required(),
    role: Joi.string().required()
  })

  try {
    await schema.validate({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email_address: req.body.email_address,
      role: req.body.role
    })
  } catch (error) {
    return res.send(error);
  }

  Users.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_address: req.body.email_address,
    role: req.body.role
  })

  res.send('New user created');
}

async function getUser(req, res) {
  const UserData = await Users.findAll();
  res.send(UserData);
}


module.exports = { createUser, getUser, User };
