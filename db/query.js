"use strict"
var knex = require('./knex');


function blogPosts() {
  return knex('blogposts');
}

function commentsPosts() {
  return knex('comments');
}

function getBlogPostbyId(blogid){
  return knex('blogposts').where('blogid', blogid)
}

function newBlogPost(name, title, content, tags, views, comments) {
  return knex('blogposts').insert({
    name: name,
    title: title,
    content: content,
    tags: 0,
    views: 0,
    comments: 0
  }).returning('blogid');
}

function newBlogComment(blog_post_id, subject, comment) {
  return knex('comments').insert({
    blog_post_id:blog_post_id,
    subject: subject,
    comment: comment
    // user_id: user_id
  }).returning('id');
}

function deleteBlogPost(blogid) {
  return knex('blogposts').where('blogid', blogid).del();
}

function deleteBlogComment(id) {
  return knex('comments').where('id', id).del();
}

function modifyBlogPost(title, content, tags, blogid) {
  return knex('blogposts')
  .where('blogid', blogid)
  .update({
    title:title,
    content:content,
    tags:tags
  })
}

function addLikeToBlogPost(blogid, likes) {
  return knex('blogposts').where('blogid', blogid).update({
  likes: likes +=1
}).returning('likes','questionid')
}

function getBlogPostLikes (blogid) {
  return knex('blogposts').where('blogid', blogid)
}

function addViewsToQuestion(blogid, views) {
  return knex('blogposts').where('blogid', blogid).update({
  views: views +=1
}).returning('views','blogid')
}

function getBlogPostViews (blogid) {
  return knex('blogposts').where('blogid', blogid)
}

function addNumOfCommentsToBlogPost(blogid, comments) {
  return knex('blogposts').where('blogid', blogid).update({
  comments: comments +=1
}).returning('comments','blogid')
}

function getBlogPostComments (blogid) {
  return knex('blogposts').where('blogid', blogid)
}

// function questions_tags() {
//     return knex('questions_tags')
// }
//
// function questions_favorites() {
//   return knex('gflowQuestions_favorites')
// }

// function getFavorites (user) {
//       return questions_favorites().join('users', 'gflow_questions_favorites.user_id', 'users.id')
//         .where('user_id', user)
//         .join('question', 'gflow_questions_favorites.gflow_questions_id', 'question.question_id')
//       }
//
// function addFavorite (gflow_questions_id, user_id) {
//       return knex('gflowQuestions_favorites').insert({
//         user_id : user_id,
//         gflow_questions_id : gflow_questions_id
//       }).returning('gflow_questions_id')
//     }


module.exports = {
  blogPosts,
  commentsPosts,
  newBlogPost,
  newBlogComment,
  deleteBlogComment,
  deleteBlogPost,
  modifyBlogPost,
  addLikeToBlogPost,
  getBlogPostLikes,
  addViewsToQuestion,
  getBlogPostViews,
  addNumOfCommentsToBlogPost,
  getBlogPostComments,
  getBlogPostbyId
}
