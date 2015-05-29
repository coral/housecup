'use strict';
var EventEmitter = require('events').EventEmitter;
var events = new EventEmitter();
var log = require('../../lib/logger')('housecup-pickban');

module.exports = function(nodecg) {

    try {
        var player = require('./extensions/pickban')(nodecg, events);
    } catch (e) {
        log.error("Failed to load pickban lib:", e.stack);
        process.exit(1);
    }

};

/*
function message(data) {
    if(data.data.event == "TURN")
    {

    }
}
*/
