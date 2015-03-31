
var klass = ['druid', 'hunter', 'mage', 'paladin', 'priest', 'rogue', 'shaman', 'warlock', 'warrior'];

$( document ).ready(function() {

    nodecg.declareSyncedVar({ variableName: 'classes1',
        setter: function(newVal) {
            $.each( $('#deck1').children(), function( key, value ) {
                var temper = value;
                _.forEach(klass,function(n, key) {
                    if($(temper).hasClass(n))
                    {
                        $(temper).html("");
                        $(temper).append('<div class="' + newVal[n] +'"></div>')
                    }
                });

            });
        }
    });

    nodecg.declareSyncedVar({ variableName: 'data',
        bundleName: 'housecup-ingame',
        setter: function(newVal) {
            $(".p1").text(newVal.players[0].nick);
            $(".p2").text(newVal.players[1].nick);
        }
    });

    nodecg.declareSyncedVar({ variableName: 'classes2',
        setter: function(newVal) {
            $.each( $('#deck2').children(), function( key, value ) {
                var temper = value;
                _.forEach(klass,function(n, key) {

                    if($(temper).hasClass(n))
                    {
                        console.log(newVal[n]);
                        $(temper).html("");
                        $(temper).append('<div class="' + newVal[n] +'"></div>')
                    }
                });

            });
        }
    });

    nodecg.listenFor("classToggle", function(data) {
        console.log(data);
        $("body").toggleClass(data);
    });


});
