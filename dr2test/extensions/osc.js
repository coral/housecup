'use strict';

var OscReceiver = require('osc-receiver')
  , receiver = new OscReceiver();

receiver.bind(9000);
console.log("STARTOSC");
var nodecg = null;

module.exports = function (extensionApi) {
	console.log(extensionApi);
     nodecg = extensionApi;

	receiver.on('/synced', function(variable, value) {

	nodecg.declareSyncedVar({
        name: variable
    });
	console.log(nodecg);
	  nodecg.variables[variable] = value;

 	});

};
