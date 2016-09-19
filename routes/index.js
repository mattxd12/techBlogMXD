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
    query.commentsPosts().where('id', id).then((data) => {
        // for (var comments of data) {
        //   var thisPostsComments = [];
        //   if (blogposts.blogid == comments.blog_post_id){
            console.log(data);
        //       data.push(thisPostsComments)
        // }
      // }
    res.render('article', {
      items:posts,
      both:data
        })
      })
    })
    .catch((err)=>{
    console.error("Error getting from the database");
    next(err)
    })
  });


//   router.get('/article/:id', (req, res, next) => {
//     query.blogPosts(req.body.id, req.params.id, req.body.subject, req.body.comment).leftJoin('comments','blogposts.blogid', 'comments.blog_post_id')
//     .select('blogposts.blogid as blogid','name', 'title', 'content','comments.blog_post_id as blog_post_id', 'comments.comment as comment', 'comments.subject as subject')
//     .where('blogid', req.params.id)
//     .then(() =>{
//       knex('comments').insert({blog_post_id: Math.floor(req.params.id)})
//       console.log(req.params.id + 'PLEASEEEE');
//     })
//     .then((comment) =>{
//       console.log(comment + "is the comment data");
//       res.render('article', {
//         data:comment
//       })
//     })
//     .catch((err)=>{
//       console.error("Error getting from the database");
//       next(err)
//      })
// });



module.exports = router;
