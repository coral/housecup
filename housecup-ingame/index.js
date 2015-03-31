'use strict';
var EventEmitter = require('events').EventEmitter;
var events = new EventEmitter();
var log = require('../../lib/logger')('housecup-ingame');

module.exports = function(nodecg) {

    try {
        var data = require('./extensions/data')(nodecg, events);
    } catch (e) {
        log.error("Failed to load deck lib:", e.stack);
        process.exit(1);
    }

    try {
        var ingame = require('./extensions/ingame-logger')(nodecg, events);
    } catch (e) {
        log.error("Failed to load logger lib:", e.stack);
        process.exit(1);
    }

    try {
        var deck = require('./extensions/deck')(nodecg, events);
    } catch (e) {
        log.error("Failed to load deck lib:", e.stack);
        process.exit(1);
    }

    try {
        var deck = require('./extensions/turn')(nodecg, events);
    } catch (e) {
        log.error("Failed to load deck lib:", e.stack);
        process.exit(1);
    }

    try {
        var player = require('./extensions/player')(nodecg, events);
    } catch (e) {
        log.error("Failed to load deck lib:", e.stack);
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
