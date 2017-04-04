'use strict';

var flipper = require('../helpers/flipper');

module.exports = {
  isEnabled: isEnabled
};

function isEnabled(req, res) {
  var feature = req.swagger.params.feature.value;
	var actor = req.swagger.params.actor.value;

	flipper.isEnabled(feature, actor, function (error, result) {
		if(error) {
			return res.status(503).json({'message' : error})
		} else {
			return res.json(result);
		}
	})
}
