var express = require('express');
var router = express.Router();
var query = require('../db/query');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var knex = require('knex')({});

router.use(bodyParser.urlencoded(
  {extended: true}
));

router.use(cookieParser());
router.use(bodyParser.json());

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
  });

router.post('/', function (req, res, next) {
  console.log(req.body)
  query.newBlogPost(req.body.blogid, req.body.name, req.body.title, req.body.content)
  .then(() =>{
      res.redirect('/')
    })
  .catch(function(err) {
    next(err)
    })
  })


router.post('/article/:id/addcomment',(req, res, next) => {
  console.log(req.body);
  // res.json(req.body)
  query.newBlogComment(req.body.blog_post_id, req.body.subject, req.body.comment)
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

        // for (var comments of data) {
        //   var thisPostsComments = [];
        //   if (blogposts.blogid == comments.blog_post_id){
            console.log(data);
        //       data.push(thisPostsComments)
        // }
      // }
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
    console.log("deleting comment "+ req.params.id);
    query.deleteBlogPost(req.params.id)
    .then(function() {
      res.redirect('/');
    })
    .catch(function(err) {
      return next(err)
    })
  })

//not working yet
  router.get('/data/delete/:id', function(req, res, next) {
    console.log("deleting comment "+ req.params.id);
    query.deleteBlogComment(req.params.id)
    .then(function() {
      res.redirect('/');
    })
    .catch(function(err) {
      return next(err)
    })
  })


module.exports = router;
