const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const connectingString = 'mongodb+srv://noa:901234@cluster0.pa4ru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new mongoClient(connectingString, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = () => client.connect()
