const { Users } = require('../models')
const { Model } = require('sequelize');
const Joi = require('joi');

class User extends Model { }

async function createUser(req, res) {
  const schema = Joi.object({
    first_name: Joi.string().min(4).required(),
    last_name: Joi.string().required(),
    email_address: Joi.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    role: Joi.string().required()
  })

  try {
    schema.validate({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email_address: req.body.email_address,
      role: req.body.role
    })
  } catch (error) {
    return res.send(error);
  }

  try {
    await Users.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email_address: req.body.email_address,
      role: req.body.role
    })

    res.send('New user created');

  } catch (error) {
    return res.send(error);
  }


}

async function getUser(req, res) {
  const UserData = await Users.findAll();
  res.send(UserData);
}

async function updateUser() {
  const id = req.params.id;

  const schema = Joi.object({
    first_name: Joi.string().min(4),
    last_name: Joi.string(),
    role: Joi.string()
  })

  try {
    schema.validate({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      role: req.body.role
    })
  } catch (error) {
    return res.send(error);
  }

  try {
    await Users.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      role: req.body.role
    }, //what going to be updated
      {
        where: { id: id }  // where clause
      })
    res.send('User Updated');
  } catch (error) {
    return res.send(error);
  }

}


module.exports = { createUser, getUser, updateUser, User };
