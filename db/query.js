var knex = require('./knex');
var express = require('express');
var router = express.Router();
var query = require('../db/query');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// require('../routes/index.js');

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
// For new posts
function newBlogPost(blogid, name, title, content, created_at, updated_at) {
  return knex('blogposts').insert({
    blogid: blogid,
    name: name,
    title: title,
    content: content,
    // created_at: created_at,
    // updated_at: updated_at
  })
}

function newBlogComment(blog_post_id, subject, comment) {
  return knex('comments').insert({
    blog_post_id:blog_post_id,
    // created_at: created_at,
    // updated_at: updated_at,
    subject: subject,
    comment: comment
    // user_id: user_id
  })
}


function deleteBlogComment(id) {
  return knex('comments').where('id', id).del();
}

// function addBlogId() {
//   return knex('comments').insert({
//     blog_post_id:$("#commentAndBlogId").val()
//   })
// }

module.exports = {
  blogPosts,
  commentsPosts,
  newBlogPost,
  newBlogComment,
  deleteBlogComment
}
