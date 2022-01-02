const { response } = require('express');
const express = require('express');
const router = express.Router();
const mongoConnect = require('./database');
const ObjectId = require('mongodb').ObjectId;
//const hobbies = [];


const app = express();

mongoConnect().then(client => {
    const db = client.db();
    app.use(express.json())

router.get('/', (req,res) => {
    //res.send(hobbies);
    db.collection('hobbies').find().toArray().then((res) => res.send)
})



router.post('/', (req,res) => {
    const hobby= req.body;
    db.collection('hobbies').insertOne(hobby)
            .then(() => res.send(hobby.id + " added successfully"))

    //hobbies.push(req.body)
    //res.send(req.body.id + " added successfully")
})

router.get('/:id', (req,res) => {
    const idToFind = req.params["id"];
    db.collection('hobbies').find({id: idToFind}).toArray()
     .then((response) => res.send(response))

    /*
    let hobbies1 = hobbies.find((item) => item.id == id);
    if (hobbies1) {
        res.send(hobbies1);
    }
    else
        res.send("There is no user with " + id + " ID")
        */
})


/*

router.patch('/hobbies/:id', (req,res) => {
    const id = req.params["id"];
    const hobbies = hobbies.find((item) => item.id == id);
    if (hobbies ) {
        var index = users.findIndex((item) => item.id == id);
        hobbies
        res.send("hobbie added");

    }
    else{
        res.status(404);
    }

})
*/


}).catch(err => {
    console.log(err);
})

module.exports = router;

