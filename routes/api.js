const express = require('express');
const mongodb = require("mongodb");
const {ObjectId} = require("mongodb");
const router = express.Router();

const mongo = new mongodb.MongoClient(process.env.MONGODB,{maxIdleTimeMS: 30*60*1000}).db('lai');
const rosterClient = mongo.collection('rosters');
const characterClient = mongo.collection('characters');

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

router.get('/character', async function(req, res, next) {
  res.send(await characterClient.find().toArray());
    }
)

router.get('/character/search', async function(req, res, next) {
  res.send(await characterClient.find({name: req.query.characterName}).toArray());
});

router.post('/character', async function(req, res, next) {
  const data = await characterClient.insertOne(req.body)
  res.send("fail");
});

router.put('/character',async function(req, res, next) {
  await characterClient.updateOne(
      { _id: new ObjectId(req.body._id) },
      {
        $set:{
          roster:req.body.roster,
          name:req.body.name,
          class:req.body.class,
          level:req.body.level,
          lopec:req.body.lopec,
          zloa:req.body.zloa,
        }
      }
      );
  res.send("fail");
})

router.delete('/character', async function(req, res, next) {
  await characterClient.deleteOne({_id: new ObjectId(req.query._id) })
  res.send("fail");
});

module.exports = router;
