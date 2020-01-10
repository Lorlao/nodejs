var express = require('express');
var router = express.Router();
 
const dbConnection = require('../dbConnection')
const ObjectId = require('mongodb').ObjectId;

//CREATE COMMENTS
router.get('/:id/comments', function (req, res, next) {
    let comments = []
    MongoClient.connect(url, function (err, client) {
      if (err) {
        return
      }
      console.log('Connected successfully to server')
  
      const db = client.db(dbName)
  
        db.collection('tweets')
          .findOne({_id: new ObjectId(req.params.id)}, null, function (err, tweet) {
            tweet.comments.forEach(function (comment) {
              db.collection('tweets')
                .findOne({_id: comment}, null, function (err, tweetComment) {
                  console.log(err)
                  console.log(tweetComment)
                  comments.push(tweetComment)
                })
            })
  
            console.log(comments)
            res.render('comments', {comments: comments})
          })
      // client.close()
    })
  })

module.exports = router;