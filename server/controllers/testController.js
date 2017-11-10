
var jsStringEscape = require('js-string-escape')
var mongoose = require('mongoose');
var Algo = mongoose.model('algorithmSchema');
var fs = require('fs');
var bubbleSort = require('../data/bubblesort.js');
var cmd=require('node-cmd');


function writeTestToFile (test, functionName){
	fs.writeFileSync('./data/test.js',`var ${functionName} = require('./submission.js').${functionName};\nvar chai = require('chai'); \nvar mocha = require('mocha');\n`)
	fs.appendFileSync('./data/test.js', test);
	console.log('The Test file has been saved!');
	/*fs.writeFile('./data/test.js', test, (err) => {
	  if (err) throw err;
	  console.log('The Test file has been saved!');
	});*/
}

function writeSubmissionToFile(submission, functionName){
	fs.writeFileSync('./data/submission.js', `module.exports.${functionName}=`);
	fs.appendFileSync('./data/submission.js', submission);
	console.log('The Submission file has been saved!');
	/*fs.writeFile('./data/submission.js', submission, (err) => {
	  if (err) throw err;
	  console.log('The Submission file has been saved!');
	});*/

}

exports.getSubmissionEvaluation = function(req,res){

	var submission = bubbleSort.bubbleSort.func
	var functionName = 'bubbleSort';

	/*var submission = req.body.value;
	var test = req.body.tests;
	var functionName = req.body.functionName*/

	Algo.find({}, (err, allAlgos) => {
		if (err) throw(err); 
		var test = allAlgos[0].testingSuite;//TO REMOVE ONCE values are available off of req.body
		writeTestToFile(test, functionName);
		writeSubmissionToFile(submission, functionName);

		console.log("TESTING CHILD PROCESS");
		
		cmd.get('cd data && mocha', function(err, data, stderr){
			var passing = data[/passing/.exec(data).index - 2];
			var failing = data[/failing/.exec(data).index - 2];
			console.log('CD OUTPUT');
			console.log(data);
			console.log('Passing ', passing);
			console.log('Failing', failing);
			var returnObj = {'passing': passing, 
							 'failing': failing,
							 'testResults': data
							}
            //console.log(err);
            //console.log(stderr);
            res.send(returnObj);
        });
	});

	//res.send('Hello');
}