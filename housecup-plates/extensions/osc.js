'use strict';

var OscReceiver = require('osc-receiver')
  , receiver = new OscReceiver();

receiver.bind(9000);
console.log("STARTOSC");
var nodecg = null;

module.exports = function (extensionApi) {
     nodecg = extensionApi;

	receiver.on('/synced', function(variable, value) {

	nodecg.declareSyncedVar({
        name: variable
    });
	  nodecg.variables[variable] = value;

 	});

};
