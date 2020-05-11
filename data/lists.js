const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = process.env.DB_URL;

const dbName = 'lists';
const colName = 'to_do';

const settings = { useUnifiedTopology : true };

const getLists = () => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, async function(client, err) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to GET lists.")
                db = client.db(dbName);
                collection = db.collection(colName);
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

module.exports = {
    getLists    
}