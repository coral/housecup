'use strict';

var fs = require('fs');
var _ = require('lodash');
var nodecg = null;

module.exports = function (extensionApi, events) {
    nodecg = extensionApi;

    nodecg.declareSyncedVar({ variableName: 'activePlayers',
        initialVal: []
    });

    nodecg.listenFor('changePlayer', function (data, callback) {
        var newPlayer = _.find(nodecg.variables.playerdata, { 'nick': data.selectedPlayer });
        newPlayer.stats = _.find(nodecg.variables.playerstats, { 'nick': data.selectedPlayer });
        nodecg.variables.activePlayers[data.slot] = newPlayer;

        events.emit('changedPlayer');
        console.log("change player : " + data.slot);
    });


}
