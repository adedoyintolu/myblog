const { Posts } = require('../models')
const { Model } = require('sequelize');
const Joi = require('joi');

class Post extends Model { }

async function createPost(req, res) {
  const schema = Joi.object({
    title: Joi.string().min(4).required(),
    slug: Joi.string().required(),
    status: Joi.string().required(),
    summary: Joi.string().required(),
    content: Joi.string().required(),
    tags: Joi.string().required(),
    created_by: Joi.string().required()
  })

  try {
    schema.validate({
      title: req.body.title,
      slug: req.body.slug,
      status: req.body.status,
      summary: req.body.summary,
      content: req.body.content,
      tags: req.body.tags,
      created_by: req.body.created_by
    })
  } catch (error) {
    return res.send(error);
  }

  try {
    Posts.create({
      title: req.body.title,
      slug: req.body.slug,
      status: req.body.status,
      summary: req.body.summary,
      content: req.body.content,
      tags: req.body.tags,
      created_by: req.body.created_by
    })
    res.send('New Post created');
  } catch (error) {
    return res.send(error);
  }
}

async function getPost(req, res) {
  const PostData = await Posts.findAll();
  res.send(PostData);
}

async function updatePost() {

  const schema = Joi.object({
    title: Joi.string().min(4),
    slug: Joi.string(),
    status: Joi.string(),
    summary: Joi.string(),
    content: Joi.string(),
    tags: Joi.string(),
  })

  try {
    schema.validate({
      title: req.body.title,
      slug: req.body.slug,
      status: req.body.status,
      summary: req.body.summary,
      content: req.body.content,
      tags: req.body.tags,
    })
  } catch (error) {
    return res.send(error);
  }

  try {
    await Posts.update({
      title: req.body.title,
      slug: req.body.slug,
      status: req.body.status,
      summary: req.body.summary,
      content: req.body.content,
      tags: req.body.tags,
    }, //what going to be updated
      {
        where: { id: 1 }  // where clause
      })
    res.send('Post Updated');
  } catch (error) {
    return res.send(error);
  }
}

module.exports = { createPost, getPost, updatePost, Post };
