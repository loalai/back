const express = require('express');
const mongodb = require("mongodb");
const {ObjectId} = require("mongodb");
const router = express.Router();

const mongo = new mongodb.MongoClient(process.env.MONGODB,{maxIdleTimeMS: 30*60*1000}).db('lai');
const rosterClient = mongo.collection('rosters');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/url', function(req, res, next) {
  res.send("roster");
});

router.get('/roster', async function(req, res, next) {
  res.send(await rosterClient.find().toArray());
});

router.post('/roster', async function(req, res, next) {
  const data = await rosterClient.insertOne(req.body)
  res.send("fail");
});

router.put('/roster', async function(req, res, next) {
  await rosterClient.updateOne({ _id: new ObjectId(req.body._id) },{$set:{roster:req.body.roster}});
  res.send("fail");
});

router.delete('/roster', async function(req, res, next) {
  await rosterClient.deleteOne({_id: new ObjectId(req.query._id) })
  res.send("fail");
});


module.exports = router;
