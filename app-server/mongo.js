const MongoClient = require("mongodb").MongoClient;
let dbHandle;
let dbClient;

function init() {
  let url = process.env.MONGO_URI; //"mongodb://mongodb-myapp:27017/"
  if (!url) {
    url = "mongodb://mongodb-myapp:27017/";
  }

  const options = {
    readPreference: "nearest", //ReadPreference.NEAREST
  };
  console.log("connecting to mongo...")
  MongoClient.connect(url, options, (err, db) => {
    if (err) {
      console.log("error connection to mongo:", err)
      setTimeout(init, 5000);
      return;
    }
    if (dbClient) {
      dbClient.close();
    }
    dbClient = db;
    dbHandle = db.db("myNewDb");
    dbHandle.createCollection(
      "sample",
      (error, collection) => {
        if (error) {
          console.log("error while creating collection:", error)
        } else {
          console.log("succesfully created collection");
        }
      }
    );
  });
}

function insertOneItem(dbLatency, item, callback) {
  console.log("insert item to mongo for collection")
  const startTime = Date.now();

  dbHandle.collection('sample').insertOne(item, (err, res) => {
    dbLatency.push("durationInsertItem=" + (Date.now() - startTime));
    if (err) {
      init();
      return callback(err);
    }
    return callback(null, res);
  });
}

function updateItem(dbLatency, filter, newValues, callback) {
  console.log("update item to mongo collection ")
  const startTime = Date.now();
  const setNewValues = {
    $set: newValues,
  };
  // upsert: true - will insert new entry incase no entry is present.
  // Valid for components for which configuration data is not yet pushed in system// Inserts newValues
  dbHandle.collection("sample").updateOne(
    filter,
    setNewValues,
    {
      upsert: true,
    },
    (err, res) => {
      dbLatency.push("durationUpdateItem=" + (Date.now() - startTime));
      if (err) {
        init();
        return callback(err);
      }
      return callback(null, res);
    }
  );
}

function getItem(dbLatency, callback) {
  console.log("getting item from mongo")
  const startTime = Date.now();
  let conditions = {};
  dbHandle
    .collection("sample")
    .find(conditions, {
      projection: {
        _id: 0,
      },
    })
    .toArray((err, res) => {
      dbLatency.push("durationGetData=" + (Date.now() - startTime));
      if (err) {
        init();
        return callback(err);
      }
      return callback(null, res);
    });
}

module.exports = {
  init,
  insertOneItem,
  updateItem,
  getItem
}