'use strict';

var fs = require('fs');
var _ = require('lodash');
var nodecg = null;


module.exports = function (extensionApi, events) {
    nodecg = extensionApi;

    nodecg.declareSyncedVar({ variableName: 'gamedeck',
        initialVal: [[], [], []]
    });

    nodecg.declareSyncedVar({ variableName: 'showdeck',
        initialVal: [],
        setter: function(showdeck) {
            console.log(showdeck);
        }
    });

    events.on('HERO', function (message) {
        var activeClass = _.result(_.find(nodecg.variables.heroesdata, { 'id': message.data.data }), 'playerClass');
        nodecg.variables.activePlayers[message.computer].activeClass = activeClass;
        nodecg.variables.gamedeck[message.computer] = _.clone(_.find(nodecg.variables.activePlayers[message.computer].decks, {'deckClass': activeClass}), true);
        console.log(nodecg.variables.activePlayers[message.computer].nick + " is " + activeClass);
    });

    events.on('INIT', function (message) {
        if(message.data.data != "GAME_005") {
            var tempSplice = nodecg.variables.gamedeck;
            tempSplice[message.computer].cards.splice(_.findIndex(nodecg.variables.gamedeck[message.computer].cards, { 'name': convertCard(message.data.data).name }),1);
            nodecg.variables.gamedeck = tempSplice;
            console.log("Removed " + convertCard(message.data.data).name);

            var tempSplice = nodecg.variables.gamedeck;
            nodecg.variables.gamedeck = tempSplice;
        }
    });

    events.on('TAKE', function (message) {
        if(message.data.data != "GAME_005") {
            var tempSplice = nodecg.variables.gamedeck;
            if (_.findIndex(nodecg.variables.gamedeck[message.computer].cards, { 'name': convertCard(message.data.data).name }) >= 0) {
              tempSplice[message.computer].cards.splice(_.findIndex(nodecg.variables.gamedeck[message.computer].cards, { 'name': convertCard(message.data.data).name }),1);
            }
                      nodecg.variables.gamedeck = tempSplice;
            console.log("Removed " + convertCard(message.data.data).name);
        }
    });

    events.on('PUT', function (message) {
        if(message.data.data != "GAME_005") {
          nodecg.variables.gamedeck[message.computer].cards.push(convertCard(message.data.data));

            //var tempSplice = ;
            nodecg.variables.gamedeck = nodecg.variables.gamedeck;
            //nodecg.variables.gamedeck[message.computer].cards.splice(_.findIndex(nodecg.variables.gamedeck[message.computer], { 'name': convertCard(message.data.data) }),1);
            console.log("Added " + convertCard(message.data.data).name);
        }
    });

    nodecg.listenFor('changeClass', function (data) {
        nodecg.variables.activePlayers[data.slot].activeClass = data.selectedClass;
        console.log(nodecg.variables.activePlayers[data.slot].activeClass)
        //console.log("change class to " + data.selectedClass);
        //var newDeck = _.find(_.result(_.find(nodecg.variables.playerdata, { 'nick': nodecg.variables.activePlayers[data.slot].nick }),'decks'), {'deckClass': data.selectedClass});
        //nodecg.variables.showdeck = newDeck;
    });

    nodecg.listenFor('loadCards', function (data) {
        console.log("REKT");
        var temp = nodecg.variables.gamedeck;
        temp[1] = _.clone(_.find(nodecg.variables.activePlayers[1].decks, {'deckClass': nodecg.variables.activePlayers[1].activeClass}), true);
        temp[2] = _.clone(_.find(nodecg.variables.activePlayers[2].decks, {'deckClass': nodecg.variables.activePlayers[2].activeClass}), true);
        nodecg.variables.gamedeck = temp;
        console.log(nodecg.variables.activePlayers[1].nick + " is " + nodecg.variables.activePlayers[1].activeClass);
        console.log(nodecg.variables.activePlayers[2].nick + " is " + nodecg.variables.activePlayers[2].activeClass);
    });

    nodecg.listenFor('removeCard', function (data) {
            var tempSplice = nodecg.variables.gamedeck;
            tempSplice[data.slot].cards.splice(_.findIndex(nodecg.variables.gamedeck[data.slot].cards, { 'name': data.data }),1);
            nodecg.variables.gamedeck = tempSplice;
            console.log(convertCard("CS2_146").name);
            console.log("Removed " + data.data);
    });

    nodecg.listenFor('showdeck', function (data) {
        var temp = nodecg.variables.showdeck;
        temp = _.clone(_.find(nodecg.variables.activePlayers[data].decks, {'deckClass': nodecg.variables.activePlayers[data].activeClass}), true);
        nodecg.variables.showdeck = temp;
    });


}

function convertCard(hsid)
{
    return _.find(nodecg.variables.carddata, { 'id': hsid });
}
