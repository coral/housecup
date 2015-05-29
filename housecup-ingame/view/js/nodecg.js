
$(function() {
  //setState("off");

});

nodecg.declareSyncedVar({ variableName: 'state',
    setter: function(state) {
      if (state.state == "showdeck1" || state.state == "showdeck2") {
        deck.view = "fan";
        deck.updateView();
        state.state = "off";

        new TWEEN.Tween(lights[5]).to({intensity: 0.6}, 1000).start();
      } else {
        deck.view = "hidden";
        deck.updateView();
        new TWEEN.Tween(lights[5]).to({intensity: 0}, 1000).start();


      }


        console.log(state.state);
        setState(state.state);


    }
});


nodecg.listenFor('dropbanners', function function_name(argument) {
  dropAllBanners();
});



nodecg.declareSyncedVar({ variableName: 'turn',
    setter: function(turn) {
        console.log(turn);
        setIngameActive(currentstate);
    }
});

nodecg.declareSyncedVar({ variableName: 'data',
    setter: function(data) {
        console.log(data);
        drawBannerText(0, data.players[0]);
        drawBannerText(1, data.players[1]);

        $('#pp1 > span.presentationage').html("<b>Age:</b> " + data.players[0].age);
        $('#pp1 > span.presentationteam').html("<b>Team:</b> " + data.players[0].team);
        if (!data.players[0].team) $('#pp1 > span.presentationteam').html("");
        $('#pp1 > span.presentationclass').html("<b>Favourite class:</b> " + data.players[0].favorite_class);
        $('#pp1 > span.presentationcountry').html("<b>Country:</b> " + data.players[0].country);


    }
});

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

nodecg.declareSyncedVar({ variableName: 'showdeck',
    setter: function(showdeck) {
        console.log(showdeck);
        deck.updateDeck(showdeck);
    }
});


nodecg.declareSyncedVar({ variableName: 'gamedeck',
    setter: function(gamedeck) {
        console.log(gamedeck);
        deckLists[1].updateList(gamedeck[1]);
        deckLists[2].updateList(gamedeck[2]);
    }
});

nodecg.declareSyncedVar({ variableName: 'ingameFadeTime'
});
