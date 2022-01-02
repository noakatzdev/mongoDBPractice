const express = require('express');
const bodyParser = require('body-parser');
const hobbies = require('./hobbies');
const mongoConnect = require('./database');
const ObjectId = require('mongodb').ObjectId;

//const help = require('./help');


const port = 7000;
const app = express();

mongoConnect().then(client => {
    const db = client.db();
    app.use(express.json())


    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


    //in order to routh from server 
    //app.use('/help', help)
    app.use('/hobbies', hobbies)


    //const users = [];

    app.listen(port, () => {
        console.log("Hello from Express.js");
    })

    app.get('/', (req, res) => {
        res.send("Welcome To My Website!")
    })


    app.get('/users', (req, res) => {
        //res.send(users);
        db.collection('users').find().toArray()
            .then((response) => res.send(response))
    })

    app.get('/users/:id', (req, res) => {

        const idToFind = req.params.id;
        db.collection('users').find({ _id: ObjectId(idToFind) }).toArray()
            .then((response) => res.send(response))

        //const hobbies = req.body.hobbies;
        /*
        const user = users.find((item) => item.id == id);
        if (user) {
            res.send(user);
            //res.send(hobbies );
        }
        else
            res.send("There is no user with " + id + " ID")
        */
    })

    app.post('/users', (req, res) => {
        const user = req.body;
        //users.push(user);
        db.collection('users').insertOne(user)
            .then(() => res.send(user.id + " added successfully"))

        //hobbies.push(req.body.hobbies);
    })

    app.delete('/users/:id', (req, res) => {
        const id = req.params["id"];
        //const user = users.find((item) => item.id == id);

        db.collection('users').deleteOne({ _id: ObjectId(idToFind) })
        response.send("user deleted")

        /*
        if (user) {
            var index = users.findIndex((item) => item.id == id);
            users.splice(index, 1);
            res.send("deleted");

        }
        else {
            res.status(404).send("Sorry can't find that!")

        }*/

    })
    /*
    app.patch('/users/:id', (req,res) => {
        const id = req.params["id"];
        const user = users.find((item) => item.id == id);
        if (user ) {
            var index = users.findIndex((item) => item.id == id);
            hobbies.push(req.body.hobbies);
            res.send("hobbie added");
     
        }
        else{
            res.status(404);
        }
     
    }) */


    app.use((req, res) => {
        res.status(404).send("Sorry can't find that!")
    })

}).catch(err => {
    console.log(err);
})
