var panel = $bundle.filter('.housecup-ingame');

var deck1_button = $('#housecup-ingame-deck1');
var deck2_button = $('#housecup-ingame-deck2');

var off_button = $('#housecup-ingame-off');
var pp1_button = $('#housecup-ingame-pp1');
var pp2_button = $('#housecup-ingame-pp2');
var ppw_button = $('#housecup-ingame-ppw');
var mulligan_button = $('#housecup-ingame-mulligan');
var ingame_button = $('#housecup-ingame-ingame');
var decklist_button = $('#housecup-ingame-decklist');


var active1 = $('#housecup-ingame-active1');
var active2 = $('#housecup-ingame-active2');

$('.bootstrapselect').selectpicker();

$(off_button).click(function() {
    nodecg.variables.state = {"state": "off"};
});

$(pp1_button).click(function() {
    nodecg.variables.state = {"state": "pp1"};
});

$(pp2_button).click(function() {
    nodecg.variables.state = {"state": "pp2"};
});

$(ppw_button).click(function() {
    nodecg.variables.state = {"state": "ppw"};
});

$(mulligan_button).click(function() {
    nodecg.variables.state = {"state": "mulligan"};
});

$(ingame_button).click(function() {
    nodecg.variables.state = {"state": "ingame"};
});

$(decklist_button).click(function() {
    nodecg.variables.state = {"state": "decks"};
});

$(deck1_button).click(function() {
    nodecg.variables.state = {"state": "showdeck1"};
    nodecg.sendMessage("showdeck", 1);
});

$(deck2_button).click(function() {
    nodecg.variables.state = {"state": "showdeck2"};
    nodecg.sendMessage("showdeck", 2);
});



$(active1).click(function() {
    nodecg.variables.turn = 1;
});

$(active2).click(function() {
    nodecg.variables.turn = 2;
});

nodecg.declareSyncedVar({ variableName: 'activePlayers'});
nodecg.declareSyncedVar({ variableName: 'playerstats'});

$(".players").change(function(changer) {
    var slot = $(this).data('player');
    var selectedPlayer = $("#" + $(this).attr("id") + " option:selected").val();
    nodecg.sendMessage('changePlayer', {slot: slot, selectedPlayer: selectedPlayer});
    var temp =  nodecg.variables.data;
    temp.players[slot-1] = _.find(nodecg.variables.playerstats, { 'nick': selectedPlayer });
    nodecg.variables.data = temp;
    nodecg.sendMessage('changeClass', {slot: slot, selectedClass: "Warrior"});

});

$("#wins1").change(function(changer) {
    var amount = $("#wins1 option:selected").val();
    var string = "";
    for (i = 0; i < amount; i++) {
        string = string + "∫";
    }

    var temp =  nodecg.variables.data;
    console.log(temp);
    temp.players[0].wins = string;
    nodecg.variables.data = temp;
});

$("#wins2").change(function(changer) {
    var amount = $("#wins2 option:selected").val();
    var string = "";
    for (i = 0; i < amount; i++) {
        string = string + "∫";
    }

    var temp =  nodecg.variables.data;
    console.log(temp);
    temp.players[1].wins = string;
    nodecg.variables.data = temp;
});




$(".selectClass").change(function(changer) {
    var slot = $(this).data('player');
    var selectedClass = $("#" + $(this).attr("id") + " option:selected").val();
    nodecg.sendMessage('changeClass', {slot: slot, selectedClass: selectedClass});
});




nodecg.declareSyncedVar({ variableName: 'playerdata',
    setter: function(state) {
            $("#selectPlayer1").empty();
            $.each(state, function( index, value ) {
                var selected = false;

                if(nodecg.variables.activePlayers[1] != undefined && nodecg.variables.activePlayers[1].nick != undefined)
                {
                    if(nodecg.variables.activePlayers[1].nick == value.nick)
                    {
                        selected = true;
                    }
                }
            $("#selectPlayer1").append(new Option(value.nick, value.nick, false, selected));
            });

            $("#selectPlayer2").empty();
            $.each(state, function( index, value ) {
                var selected = false;

                if(nodecg.variables.activePlayers[2] != undefined && nodecg.variables.activePlayers[2].nick != undefined)
                {
                    if(nodecg.variables.activePlayers[2].nick == value.nick)
                    {
                        selected = true;
                    }
                }
            $("#selectPlayer2").append(new Option(value.nick, value.nick, false, selected));
        });
    }
});

nodecg.declareSyncedVar({ variableName: 'ingameFadeTime',
    initialVal: 300,
    setter: function(lol)
    {
        console.log(lol);
    }
});



nodecg.declareSyncedVar({ variableName: 'carddata'});
nodecg.declareSyncedVar({ variableName: 'heroesdata',
    setter: function(state) {
        $(".selectClass").empty();
        $.each(state, function( index, value ) {
            var selected = false;


            $(".selectClass").append(new Option(value.playerClass, value.playerClass, false, selected));
        });
    }
});

nodecg.declareSyncedVar({ variableName: 'state',
    initialVal: "off",
    setter: function(state) {
        if(state.state == "off")
        {
            off_button.prop('disabled', true);
            pp1_button.prop('disabled', false);
            pp2_button.prop('disabled', false);
            ppw_button.prop('disabled', false);
            mulligan_button.prop('disabled', false);
            ingame_button.prop('disabled', false);
            decklist_button.prop('disabled', false);
            deck1_button.prop('disabled', false);
            deck2_button.prop('disabled', false);

        }
        if(state.state == "pp1")
        {
            off_button.prop('disabled', false);
            pp1_button.prop('disabled', true);
            pp2_button.prop('disabled', false);
            ppw_button.prop('disabled', false);
            mulligan_button.prop('disabled', false);
            ingame_button.prop('disabled', false);
            decklist_button.prop('disabled', false);
            deck1_button.prop('disabled', false);
            deck2_button.prop('disabled', false);

        }
        if(state.state == "pp2")
        {
            off_button.prop('disabled', false);
            pp1_button.prop('disabled', false);
            pp2_button.prop('disabled', true);
            ppw_button.prop('disabled', false);
            mulligan_button.prop('disabled', false);
            ingame_button.prop('disabled', false);
            decklist_button.prop('disabled', false);
            deck1_button.prop('disabled', false);
            deck2_button.prop('disabled', false);

        }
        if(state.state == "ppw")
        {
            off_button.prop('disabled', false);
            pp1_button.prop('disabled', false);
            pp2_button.prop('disabled', false);
            ppw_button.prop('disabled', true);
            mulligan_button.prop('disabled', false);
            ingame_button.prop('disabled', false);
            decklist_button.prop('disabled', false);
            deck1_button.prop('disabled', false);
            deck2_button.prop('disabled', false);

        }
        if(state.state == "mulligan")
        {
            off_button.prop('disabled', false);
            pp1_button.prop('disabled', false);
            pp2_button.prop('disabled', false);
            ppw_button.prop('disabled', false);
            mulligan_button.prop('disabled', true);
            ingame_button.prop('disabled', false);
            decklist_button.prop('disabled', false);
            deck1_button.prop('disabled', false);
            deck2_button.prop('disabled', false);

        }
        if(state.state == "ingame")
        {
            off_button.prop('disabled', false);
            pp1_button.prop('disabled', false);
            pp2_button.prop('disabled', false);
            ppw_button.prop('disabled', false);
            mulligan_button.prop('disabled', false);
            ingame_button.prop('disabled', true);
            decklist_button.prop('disabled', false);
            deck1_button.prop('disabled', false);
            deck2_button.prop('disabled', false);

        }
        if(state.state == "decks")
        {
            off_button.prop('disabled', false);
            pp1_button.prop('disabled', false);
            pp2_button.prop('disabled', false);
            ppw_button.prop('disabled', false);
            mulligan_button.prop('disabled', false);
            ingame_button.prop('disabled', false);
            decklist_button.prop('disabled', true);
            deck1_button.prop('disabled', false);
            deck2_button.prop('disabled', false);

        }
        if(state.state == "showdeck1")
        {
            off_button.prop('disabled', false);
            pp1_button.prop('disabled', false);
            pp2_button.prop('disabled', false);
            ppw_button.prop('disabled', false);
            mulligan_button.prop('disabled', false);
            ingame_button.prop('disabled', false);
            decklist_button.prop('disabled', false);
            deck1_button.prop('disabled', true);
            deck2_button.prop('disabled', false);
        }

        if(state.state == "showdeck2")
        {
            off_button.prop('disabled', false);
            pp1_button.prop('disabled', false);
            pp2_button.prop('disabled', false);
            ppw_button.prop('disabled', false);
            mulligan_button.prop('disabled', false);
            ingame_button.prop('disabled', false);
            decklist_button.prop('disabled', false);
            deck1_button.prop('disabled', false);
            deck2_button.prop('disabled', true);
        }

    }
});

nodecg.declareSyncedVar({ variableName: 'turn',
    setter: function(state) {
        if(state == 1)
        {
            active1.prop('disabled', true);
            active2.prop('disabled', false);
        }
        if(state == 2)
        {
            active1.prop('disabled', false);
            active2.prop('disabled', true);
        }
    }
});

nodecg.declareSyncedVar({ variableName: 'data',
    initialVal: {
        "players":[
            {
                "id": "player1",
                "nick": "love",
                "name": "KORVERIK",
                "wins": 0,
                "uid": "9w3eiurf90sjpgfio"
            },
            {
                "id": "player2",
                "nick": "SIMMESAMME",
                "name": "SIMON SUNDAÉ",
                "wins": 0,
                "uid": "ahg43gadfsgaszd"
            }]
    },
    setter: function(data) {
        console.log(data);
    }
});

