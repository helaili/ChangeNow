'use strict';

var util = require('util');
var url = require('url'),
	restClient = require('http'),
  querystring = require('querystring');

module.exports = {
  isEnabled: isEnabled
};

function isEnabled(req, res) {
  var feature = req.swagger.params.feature.value;
	var actor = req.swagger.params.actor.value;

	var options = {
    'host': 'localhost',
		'port': 3000,
    'path': '/flipper-enabled',
    'method': 'POST'
  };

	var postData = "flipper_id=" + actor + "&feature=" + feature;

	var apiResBody = '';

  var apiRequest = restClient.request(options, function(apiRes) {
    apiRes.setEncoding('utf8');

    apiRes.on('data', function (chunk) {
      apiResBody += chunk;
    });

    apiRes.on('error', function (chunk) {
				console.log('Crap!!!!', chunk);
    });

    apiRes.on('end',function() {
			return res.json(apiResBody);
    });
  });

	apiRequest.write(postData);
  apiRequest.end();
}
