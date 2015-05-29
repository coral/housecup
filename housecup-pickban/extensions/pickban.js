'use strict';

var fs = require('fs');
var nodecg = null;

var phases = [
  {round: "Idle - wait for it", max:0, side: 'ban', timerspeed: 11},
  {round: "Phase 1 - Ban 1 opponent deck", max:1, side: 'ban', timerspeed: 1.5},
  {round: "Phase 2 - Pick 2 decks", max:2, side: 'pick', timerspeed: 1},
  {round: "Phase 3 - Ban 2 opponent decks", max:2, side: 'ban', timerspeed: 1},
  {round: "Phase 4 - Pick 2 decks", max:2, side: 'pick', timerspeed: 1},
  {round: "Phase 5 - Ban 1 opponent deck", max:1, side: 'ban', timerspeed: 1.5}



];

var tempPlayerpicks = {};

module.exports = function (extensionApi, events) {
    nodecg = extensionApi;

    nodecg.listenFor('Picks', function (p) {
      console.log(p);
      tempPlayerpicks["p" + p.player] = p.picks;

      console.log(tempPlayerpicks);

      if (tempPlayerpicks.p0 && tempPlayerpicks.p1) {
        console.log('Got both selections');

        selectionDone();
      }

    });

    nodecg.declareSyncedVar({ variableName: 'Phase',
        initialVal: 1,
        setter: function (newVal) {
          console.log(newVal);
        }
    });

    nodecg.listenFor('StartPhase', function () {
      tempPlayerpicks = {};

      nodecg.sendMessage('startPickTimer', phases[nodecg.variables.Phase]);

    });

    nodecg.declareSyncedVar({ variableName: 'classes1',
      setter: function(newVal) {


      }
    });

    nodecg.declareSyncedVar({ variableName: 'classes2',
      setter: function(newVal) {


      }
    });




}

function selectionDone() {
  var p = phases[nodecg.variables.Phase];

  for (var i in tempPlayerpicks) {
    var t = tempPlayerpicks[i];
    console.log(i);

    for (var j in t) {
      console.log(t[j]);

      if ((p.side == 'pick' && i == "p0") || (p.side == 'ban' && i == "p1")) {
        var c = 'classes1';
      } else {
        var c = 'classes2';
      }

      nodecg.variables[c][t[j]] = (p.side == 'pick') ? "notrekt":"rekt";
    }
  }

  // If this is the last phase
  if (nodecg.variables.Phase == phases.length - 1) {
    for (var i in nodecg.variables.classes1) {
      if (nodecg.variables.classes1[i] != "rekt") nodecg.variables.classes1[i] = "notrekt";
    }

    for (var i in nodecg.variables.classes2) {
      if (nodecg.variables.classes2[i] != "rekt") nodecg.variables.classes2[i] = "notrekt";
    }
  }

  var temp = nodecg.variables.classes1;
  nodecg.variables.classes1 = temp;

  var temp = nodecg.variables.classes2;
  nodecg.variables.classes2 = temp;

  if (nodecg.variables.Phase < phases.length - 1) {
    nodecg.variables.Phase =  nodecg.variables.Phase + 1;
    nodecg.sendMessage('StartPhase');
  }



}
