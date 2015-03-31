'use strict';

var fs = require('fs');
var _ = require('lodash');
var nodecg = null;

module.exports = function (extensionApi, events) {
    nodecg = extensionApi;


    nodecg.declareSyncedVar({ variableName: 'playerdata'});
    nodecg.declareSyncedVar({ variableName: 'playerstats'});
    nodecg.declareSyncedVar({ variableName: 'carddata'});
    nodecg.declareSyncedVar({ variableName: 'heroesdata'});

    fs.readFile(__dirname + '/data/players.json', function (err, data) {
      if (err) throw err;
        nodecg.variables.playerdata = JSON.parse(data);
    });

    fs.readFile(__dirname + '/data/playerstats.json', function (err, data) {
      if (err) throw err;
        nodecg.variables.playerstats = JSON.parse(data);
    });

    fs.readFile(__dirname + '/data/cards.json', function (err, data) {
      if (err) throw err;
        nodecg.variables.carddata = JSON.parse(data);
    });

    fs.readFile(__dirname + '/data/heroes.json', function (err, data) {
      if (err) throw err;
        nodecg.variables.heroesdata = JSON.parse(data);
    });

}
