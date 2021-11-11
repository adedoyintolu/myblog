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
    schema.validate({
      post_id: req.body.post_id,
      posted_by: req.body.posted_by,
      content: req.body.content
    })
  } catch (error) {
    return res.send(error);
  }

  try {
    Comments.create({
      post_id: req.body.post_id,
      posted_by: req.body.posted_by,
      content: req.body.content
    })

    res.send('New comment added');
  } catch (error) {
    return res.send(error);
  }
}

async function getComment(req, res) {
  const CommentData = await Comments.findAll();
  res.send(CommentData);
}

async function updateComment() {
  const id = req.params.id;

  const schema = Joi.object({
    content: Joi.string()
  })

  try {
    schema.validate({
      content: req.body.content
    })
  } catch (error) {
    return res.send(error);
  }


  try {
    await Comments.update({
      content: req.body.content
    }, //what going to be updated
      {
        where: { id: id }  // where clause
      })
    res.send('Comment Updated');
  } catch (error) {
    return res.send(error);
  }

}

async function getCommentById(req, res) {
  const id = req.params.id;

  const CommentDataById = await Comments.findAll({
    where: {
      id: id
    }
  });
  res.send(CommentDataById);
}

module.exports = { createComment, getComment, updateComment, getCommentById, Comment };

