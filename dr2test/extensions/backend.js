'use strict';

var Q = require('q');
var request = require('request');
var nodecg = null;

module.exports = function (extensionApi) {
	nodecg = extensionApi;

	nodecg.declareSyncedVar({
		name: 'questionResponse',
		initialVal: {}
	});

	nodecg.declareSyncedVar({
		name: 'questionData',
		initialVal: {
			question_id: 2,
			vote_id: 2,
			cat_id: 2
		},
		setter: function(newVal) {
			update();
		}
	});

	update();

	nodecg.listenFor('getQuestion', function(data, cb) {
		nodecg.log.info("Getting question");
		update()
			.then(function (updated) {
				cb(null, updated);
			}, function (error) {
				cb(error);
			});
	});
};


function update() {

	request('http://77.53.225.23/valanalys.aspx?' +
		'question_id=' + nodecg.variables.questionData.question_id +
		'&vote_id=' + nodecg.variables.questionData.question_id +
		'&cat_id=' + nodecg.variables.questionData.cat_id +
		'&outputtype=json', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			nodecg.variables.questionResponse = (JSON.parse(body));
		}
	})

}
