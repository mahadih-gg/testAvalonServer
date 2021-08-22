
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sioj4.mongodb.net/${process.env.DB_HOST}?retryWrites=true&w=majority`;

const uri = "mongodb+srv://testAvalon:mahadi937524mh@cluster0.sioj4.mongodb.net/avalon?retryWrites=true&w=majority";

const app = express()
app.use(bodyParser.json());
app.use(cors());

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const homeHederCollection = client.db("avalon").collection("homeHeder");

    console.log("defaultErr", err ? err.message : "No Error");

    app.post('/addHeroData', (req, res) => {
        const data = req.body
        console.log(data);
        homeHederCollection.insertOne(data)
            .then(results => {
                console.log(results);
                res.send(results.acknowledged)
            })
    })
    app.get('/homeHeroData', (req, res) => {
        homeHederCollection.find({})
            .toArray((err, data) => {
                res.send(data)
            })
    })

    app.get('/', function (req, res) {
        res.send('hello world')
    });


})
app.listen(process.env.PORT || 8080);

