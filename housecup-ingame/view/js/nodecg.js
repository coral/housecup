
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

        $('#pp1 > span.prevtournamentname').text(data.players[0].previous_tournaments[0].tournament);
        $('#pp1 > span.prevtournamentplace').text(ordinal_suffix_of(data.players[0].previous_tournaments[0].placement) + " place");
        $('#pp1 > span.prevtournamentprice').text("$" + data.players[0].previous_tournaments[0].prize);
        if (!data.players[0].previous_tournaments[0].prize) $('#pp1 > span.prevtournamentprice').text("");

        $('#pp2 > span.prevtournamentname').text(data.players[1].previous_tournaments[0].tournament);
        $('#pp2 > span.prevtournamentplace').text(ordinal_suffix_of(data.players[1].previous_tournaments[0].placement) + " place");
        $('#pp2 > span.prevtournamentprice').text("$" + data.players[1].previous_tournaments[0].prize);
        if (!data.players[1].previous_tournaments[0].prize) $('#pp2 > span.prevtournamentprice').text("");

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
