const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();

const url = process.env.MONGODB;
const client = new MongoClient(url);

const dbName = 'INSIGHT_NOW';
const app = express();
const port = 3001;

//database connection
client.connect();

//this is a middleware used for parse the incomming json data which makes it easy to access and work with it
app.use(cors())
app.use(bodyParser.json());

//get user data
//illi nav frontend inda username na kalstivi url inda id recieve madi illi backend side alli data kalsutte
app.get('/:user/:pass', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('userData');
    // const x = req.body.user
    const x = req.params.user
    const y = req.params.pass
    const findResult = await collection.findOne({ user: x, pass: y });
    res.json(findResult);
});
app.get('/:user', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('userData');
    const x = req.params.user
    const findResult = await collection.findOne({ user: x });
    if (findResult)
        res.json(true);
    else res.json(false)
});

//save user data
app.post('/', async (req, res) => {
    const db = client.db(dbName);
    //req.body is the json sent by the user in form
    const userData = req.body;
    const collection = db.collection('userData');
    await collection.insertOne(userData);
    res.send({ success: true });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});