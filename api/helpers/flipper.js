'use strict';

var util = require('util');
var url = require('url'),
	restClient = require('http'),
  querystring = require('querystring');

module.exports = {
  isEnabled: isEnabled
};

function isEnabled(feature, actor, callback) {
	var options = {
    'host': 'localhost',
		'port': 3000,
    'path': '/flipper-enabled',
    'method': 'POST'
  }

	var postData = "flipper_id=" + actor + "&feature=" + feature

	var apiResBody = ''

  var apiRequest = restClient.request(options, function(apiRes) {
    apiRes.setEncoding('utf8')

    apiRes.on('data', function (chunk) {
      apiResBody += chunk
    })

    apiRes.on('error', function (chunk) {
			console.error('Crap!!!!', chunk)
      callback(chunk, null)
    })

    apiRes.on('end',function() {
			callback(null, JSON.parse(apiResBody))
    })
  })

	apiRequest.write(postData)
  apiRequest.end()
}
