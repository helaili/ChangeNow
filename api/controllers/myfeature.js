'use strict';


const science = require('../scientist/console');

module.exports = {
  doSomething: doSomething,
	doSomethingElse: doSomethingElse
};

function doSomething(req, res) {
	var a = req.swagger.params.op1.value;
	var b = req.swagger.params.op2.value;
  // Awful bug!!!!! 
	var ab = [a, 0];

	var experimentResult = science('div-array', (experiment) => {
    experiment.context({ 'div':  a + '/' + b});
		experiment.use(() => divOld(a, b));
    experiment.try(() => divNew(ab));
  });

	return res.json({'result': experimentResult});
}

function divOld(a, b) {
	return a/b;
}

function divNew(arr) {
	return arr[0]/arr[1];
}


function doSomethingElse(req, res) {
	var params = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

	var experimentResult = science('multiply-forEach', (experiment) => {
    experiment.context({ 'multiply':  params});
		experiment.use(() => multiplyOld(params));
    experiment.try(() => multiplyNew(params));
  });

	return res.json({'result': experimentResult});
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function multiplyOld(arr) {
	for(var d = 0; d < 100000; d++) {
		var result = 1;
		for(var index = 0; index < arr.length; index++) {
			result *= arr[index];
		}
	}
	return result;
}

function multiplyNew(arr) {
	for(var d = 0; d < 100000; d++) {
		var result = 1;
		arr.forEach( (item) => {
			result *= item;
		});
	}
	return result;
}
