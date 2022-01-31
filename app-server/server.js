const express = require('express')
const path = require("path")
var bodyParser = require('body-parser')
const mongo = require("./mongo.js");
const app = express()
const port = 3000

// create application/json parser
var jsonParser = bodyParser.json()

app.use('/voterapp', express.static(path.join(__dirname, "../app-client/build")));

app.get('/voterapp/getVoteResult', (req, res) => {
  let dbLatencyStr = [];
  mongo.getItem(
    dbLatencyStr,
    function (error, response) {
      if (error) {
        console.log("failed to get item from mongo", error)
      } else {
        console.log("success retrieved the data");
        res.json(response);
      }
    }
  );
})

app.post('/voterapp/updateVotes', jsonParser, function (req, res) {
  let dbLatencyStr = [];
  let filter = {};
  filter.type = "votingResult";
  console.log("new values:", req.body);
  let newvalues = JSON.parse(JSON.stringify(req.body));
  mongo.updateItem(dbLatencyStr, filter, newvalues, (error, response) => {
    if (error) {
      console.log("Error occuered while posting data:", error)
    }
    return res.send('User has been added successfully');
  });
});

app.listen(port, () => {
  console.log(`Voter app listening on port ${port}`)
})

function initMongo() {
  console.log("init mongo")
  mongo.init();
}
initMongo();