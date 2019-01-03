var fs = require('fs');
var express = require('express');
var router = express.Router();
var csv = require('fast-csv');
var levenshtein = require('fast-levenshtein');

var stream = fs.createReadStream("../normal.csv");

/* Return sorted records. */
router.get('/', function(req, res, next) {

  let records = [];

  // read in the csv data
  var csvStream = csv({headers: true})
    .on("data", function(data){
      records.push(data);
    })
    .on("end", function(){
      // sort out duplicates and send lists to client
      res.json(sortDuplicates(records));
      console.log("done\n");
    });
  stream.pipe(csvStream);
});

function sortDuplicates(records) {
  // result we return to client
  let results = {};
  // list of original records
  let originals = [];
  // list of duplicate records
  let duplicates = [];
  // record we are comparing with list of  established originals
  // and record of specific original respectivly
  let person1, person2;

  // push the first record for a base comparison
  originals.push(records[0]);

  // nested for loop to compare all records from csv to established originals
  // if a record is similar to a record in the orignals list; add it to the duplicates
  for (let i = 1; i < records.length; i++) {
    let foundDupe = false;
    person1 = records[i];

    for (let j = 0; j < originals.length; j++) {
      person2 = originals[j];

      person1FullName = person1.first_name+" "+person1.last_name;
      person2FullName = person2.first_name+" "+person2.last_name;

      // logic for comparing records by fullname
      if (levenshtein.get(person1FullName, person2FullName) < 3) {
        foundDupe = true;
      }
    }
    if (foundDupe) {
      duplicates.push(person1);
    } else {
      originals.push(person1);
    } 
  }
 
  results.originals = originals;
  results.duplicates = duplicates;

  return results;
}

module.exports = router;
