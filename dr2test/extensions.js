'use strict';

var log = require('../../lib/logger')('dr2test');

module.exports = function(nodecg) {
	try {
		var osc = require('./extensions/osc')(nodecg);
	} catch (e) {
		log.error("Failed to load osc lib:", e.stack);
		process.exit(1);
	}
	try {
		var osc = require('./extensions/backend')(nodecg);
	} catch (e) {
		log.error("Failed to load backend lib:", e.stack);
		process.exit(1);
	}
};
