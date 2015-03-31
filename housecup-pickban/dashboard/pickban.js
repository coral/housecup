var panel = $bundle.filter('.housecup-pickban');
var render = $('.render');
var render2 = $('.render2');

    var orig = {
        "druid": "on",
        "hunter": "on",
        "mage": "on",
        "paladin": "on",
        "priest": "on",
        "rogue": "on",
        "shaman": "on",
        "warlock": "on",
        "warrior": "on"
    };

    var classes = {
        "druid": "on",
        "hunter": "on",
        "mage": "on",
        "paladin": "on",
        "priest": "on",
        "rogue": "on",
        "shaman": "on",
        "warlock": "on",
        "warrior": "on"
    };

    nodecg.declareSyncedVar({ variableName: 'classes1',
        initialVal: classes,
        setter: function(newVal) {
            console.log(newVal);
        }
    });

    nodecg.declareSyncedVar({ variableName: 'classes2',
        initialVal: classes,
        setter: function(newVal) {
            console.log(newVal);
        }
    });

    nodecg.declareSyncedVar({ variableName: 'players',
        setter: function(newVal) {
            console.log(newVal);
        }
    });

    $("#housecup-pickban-show").click(function () {
        nodecg.sendMessage("classToggle","active");
    });

   $("#housecup-pickban-reset").click(function () {
        nodecg.variables.classes1 = orig;
        nodecg.variables.classes2 = orig;
    });

    var klass = ['druid', 'hunter', 'mage', 'paladin', 'priest', 'rogue', 'shaman', 'warlock', 'warrior'];

    $.each(klass, function (index, value) {
        $(render).append('<select id="'+value+'" class="'+value+' pickbans">' +
                          '<option value="on" selected>On</option>' +
                          '<option value="rekt">Ban</option>' +
                          '<option value="notrekt">Pick</option>' +
                        '</select>'
        );
        $(render2).append('<select id="'+value+'" class="'+value+' pickbans">' +
                          '<option value="on">On</option>' +
                          '<option value="rekt">Ban</option>' +
                          '<option value="notrekt">Pick</option>' +
                        '</select>'
        );

    });

    $(render).change(function(changer) {
        $(".render select").each(function(index, value) {
            console.log($(this).val() + " - " + $(this).attr('id'));
            classes[$(this).attr('id')] = $(this).val();
        });
        nodecg.variables.classes1 = classes;
    });

    $(render2).change(function(changer) {
        $(".render2 select").each(function(index, value) {
            console.log($(this).val() + " - " + $(this).attr('id'));
            classes[$(this).attr('id')] = $(this).val();
        });
        nodecg.variables.classes2 = classes;
    });
