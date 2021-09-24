const { Comments } = require('../models')
const { Model } = require('sequelize');
const Joi = require('joi');

class Comment extends Model { }

async function createComment(req, res) {
  const schema = Joi.object({
    post_id: Joi.number().required(),
    posted_by: Joi.string().required(),
    content: Joi.string().required()
  })

  try {
    await schema.validate({
      post_id: req.body.post_id,
      posted_by: req.body.posted_by,
      content: req.body.content
    })
  } catch (error) {
    return res.send(error);
  }

  Comments.create({
    post_id: req.body.post_id,
    posted_by: req.body.posted_by,
    content: req.body.content
  })

  res.send('New comment added');
}

async function getComment(req, res) {
  const CommentData = await Comments.findAll();
  res.send(CommentData);
}


module.exports = { createComment, getComment, Comment };

