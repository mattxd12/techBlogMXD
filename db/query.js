var knex = require('./knex');
var express = require('express');
var router = express.Router();
var query = require('../db/query');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded(
  {extended: true}
));

router.use(cookieParser());
router.use(bodyParser.json());


function blogPosts() {
  return knex('blogposts');
}

function commentsPosts() {
  return knex('comments');
}

function newBlogPost(blogid, name, title, content, created_at, updated_at) {
  return knex('blogposts').insert({
    blogid: blogid,
    name: name,
    title: title,
    content: content,
    created_at:created_at,
    updated_at:updated_at
  });
}

function newBlogComment(blog_post_id, subject, comment,created_at, updated_at) {
  return knex('comments').insert({
    blog_post_id:blog_post_id,
    created_at:created_at,
    updated_at:updated_at,
    subject: subject,
    comment: comment
    // user_id: user_id
  })
}

function deleteBlogPost(id) {
  return knex('blogposts').where('blogid', id).del();
}

function deleteBlogComment(id) {
  return knex('comments').where('id', id).del();
}

function modifyBlogPost(id) {
  return knex('blogposts').where('blogid', id).update();
}

function modifyBlogComment(id) {
  return knex('comments').where('id', id).update();
}


module.exports = {
  blogPosts,
  commentsPosts,
  newBlogPost,
  newBlogComment,
  deleteBlogComment,
  deleteBlogPost,
  modifyBlogPost,
  modifyBlogComment
}
