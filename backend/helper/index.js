// require the necessary libraries
const { startSession } = require("mongoose");
const { ObjectId } = require('bson');
const MongoClient = require("mongodb").MongoClient;
const fs = require('fs');
require('dotenv').config();
const {MONGO_URI} = process.env;


async function seedDB() {
    const todoFilePath = './seed/todos.json';
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const database = client.db(process.env.MONGO_DB)
        console.log('Current working directory:', process.cwd());

        const todosCollection = database.collection('todos');

        // Read the JSON files
        const todosData = JSON.parse(fs.readFileSync(todoFilePath));
        const todosDoc = convertField(todosData);

        // Insert the data into respective collections
        await todosCollection.insertMany(todosDoc);

        console.log("Database seeded! :)");
    } catch (err) {
        console.error('Error uploading seed data:', err);
    }
    finally {
        await client.close();
    }
}

function convertField(obj) {
    if (typeof obj !== 'object' || obj == null) {
        return obj
    }

    if (Array.isArray(obj)) {
        return obj.map(convertField)
    }

    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key].hasOwnProperty('$oid')) {
                result[key] = new ObjectId(obj[key]['$oid']);
            } else {
                result[key] = convertField(obj[key])
            }
        }
    }

    return result;
}

seedDB()