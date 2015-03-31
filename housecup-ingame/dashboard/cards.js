var panel = $bundle.filter('.housecup-cards');

var cards_load = $('#housecup-cards-load');
var cards_reset = $('#housecup-cards-reset');


nodecg.declareSyncedVar({ variableName: 'gamedeck',
    setter: function(state) {
        console.log(state);
        if(typeof state[1] == "object" && state[1].cards != undefined)
        {
            $('#op1').html("<ul></ul>");
            try {
                $.each(state[1].cards, function(index, value) {
                    $('#op1 ul').append("<li>"+value.name+"</li>");
                })
            } catch (e) {

            }
        }
        if(typeof state[2] == "object" && state[2].cards != undefined)
        {
            $('#op2').html("<ul></ul>");
            try {
                $.each(state[2].cards, function(index, value) {
                    $('#op2 ul').append("<li>"+value.name+"</li>");
                })
            } catch (e) {

            }
        }
    }
});

$(cards_load).click(function() {
    nodecg.sendMessage("loadCards");
});

$(".output1").on( "click", 'li', function() {
    nodecg.sendMessage("removeCard", {slot: 1, data: $(this).text()});
});

$(".output2").on( "click", 'li', function() {
    nodecg.sendMessage("removeCard", {slot: 2, data: $(this).text()});
});
