var knex = require('./knex');


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
