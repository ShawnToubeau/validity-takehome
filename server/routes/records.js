var fs = require('fs');
var express = require('express');
var router = express.Router();
var csv = require('fast-csv');

var stream = fs.createReadStream("../normal.csv");

/* Return sorted records. */
router.get('/', function(req, res, next) {

  let records = [];

  var csvStream = csv({headers: true})
    .on("data", function(data){
      records.push(data);
      console.log(data.id);
    })
    .on("end", function(){
      res.json(records)
      console.log("done\n");
    });
 
  stream.pipe(csvStream);
});

module.exports = router;
