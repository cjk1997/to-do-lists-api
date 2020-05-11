const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = process.env.DB_URL;

const dbName = 'lists';
const colName = 'to_do';

const settings = { useUnifiedTopology : true };

const getLists = () => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to GET lists.");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.find({}).toArray(function(err, result) {
                    if (err) {
                        reject (err);
                    } else {
                        resolve(result);
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

const createList = (newList) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to POST new list.");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.insertOne(newList, function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.ops[0]);
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

const addUpdateListItem = (id, listItems) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to PATCH existing and new list items.");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.updateOne({ _id : ObjectID(id) },
                { $set: { tasks : listItems } },
                function(err,result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

const deleteList = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to DELETE list.");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.deleteOne({ _id : ObjectID(id)}, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ deletedID: id});
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

module.exports = {
    getLists,
    createList,
    addUpdateListItem,
    deleteList    
};