"use strict"

var express = require('express');
var router = express.Router();
var query = require('../db/query');


/* GET home page. */
router.get('/', function(req, res, next) {
  query.blogPosts()
  .then( (data) => {
      console.log(data);
      res.render('index', {items: data});
    })
    .catch((err)=>{
       console.error("Error getting from the database");
       next(err)
     })
})

router.post('/', function (req, res, next) {
  var name = req.body.name;
  var title = req.body.title;
  var content = req.body.content;
  var tags = req.body.tags;
  query.newBlogPost(name, title, content, tags)
  .then(() =>{
      res.redirect('/')
    })
  .catch(function(err) {
    next(err)
    })
  })


router.post('/article/:id/addcomment',(req, res, next) => {
  console.log(req.body);
  var blog_post_id = req.body.blog_post_id;
  var subject = req.body.subject;
  var comment = req.body.comment;
  var tags = req.body.tags;
  query.newBlogComment(blog_post_id, subject, comment, tags)
  .then(() =>{
    res.redirect('/article/'+ req.params.id)
  })
  .catch((err)=>{
    console.log('there was an error')
    next(err)
  })
});

  router.get('/article/:id', (req, res, next) => {
    var id  = req.params.id;
    query.blogPosts().where('blogid',id).then((posts) => {
    query.commentsPosts().where('blog_post_id', id).then((data) => {
    res.render('article', {
      items:posts,
      data:data
        })
      })
    })
    .catch((err)=>{
    console.error("Error getting from the database");
    next(err)
    })
  });


  router.get('/items/delete/:id', function(req, res, next) {
    query.deleteBlogPost(req.params.id)
    .then(function() {
      res.redirect('/');
    })
    .catch(function(err) {
      return next(err)
    })
  })

  router.get('/article/:id/edit', function(req, res, next) {

    var post_id = req.params.id;

    query.getBlogPostbyId(post_id)
    .then(function(data) {
      console.log(data);
		var post = data[0];
    res.render('edit', {
        items: post
      })
    })
    .catch(function(err) {
      return next(err)
    })
});


router.post('/article/:id/edit', function(req, res, next) {

  // var post_id = req.params.id;
	// query.getBlogPostbyId(post_id)
	// .then(function(data) {
		// var post = data[0];
    var blogid = req.params.id;
    var title = req.body.title;
    var content = req.body.content;
    var tags = req.body.tags;
    console.log(req.body);
    query.modifyBlogPost(title, content, tags, blogid)
    .then(function() {
      res.redirect('/article/'+blogid)
    })
  // })
  	.catch((err)=>{
    	return next(err)
    })
})


// not working yet
//   router.get('/data/delete/:id', function(req, res, next) {
//     console.log("deleting comment "+ req.params.id);
//     query.deleteBlogComment(req.params.id)
//     .then(function() {
//       res.redirect('/');
//     })
//     .catch(function(err) {
//       return next(err)
//     })
//   })
//   router.get('/data/modify/:id', function(req, res, next) {
//     console.log("deleting comment "+ req.params.id);
//     query.modifyBlogComment(req.params.id)
//     .then(function() {
//       res.redirect('/');
//     })
//     .catch(function(err) {
//       return next(err)
//     })
  // })

module.exports = router;
