'use strict';

var nodecg = null;
var io = require('../../../lib/server').getIO();
var log = require('../../../lib/logger')('housecup-ingame');

module.exports = function (extensionApi, events) {
    nodecg = extensionApi;

    io.on('connection', function (socket) {
      socket.on('client-report', function (report) {
        log.info("GAMEDATA: ", report);
        switch(report.data.event) {
            case "INIT":
                events.emit('INIT', report);
                break;
            case "TAKE":
                events.emit('TAKE', report);
                break;
            case "MULLIGAN":
                events.emit('MULLIGAN', report);
                break;
            case "PUT":
                events.emit('PUT', report);
                break;
            case "PLAY":
                events.emit('PLAY', report);
                break;
            case "HERO":
                events.emit('HERO', report);
                break;
            case "KILL":
                events.emit('KILL', report);
                break;
            case "TURN":
                events.emit('GAME', report);
                break;
            case "WIN":
                events.emit('GAME', report);
                break;
            case "WIN":
                events.emit('GAME', report);
                break;
            default:
                break;
        }
      });
    });

}
