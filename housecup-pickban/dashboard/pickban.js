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
            for (var i in newVal) {
              render.children('.'+i).val(newVal[i]);
            }
        }
    });

    nodecg.declareSyncedVar({ variableName: 'classes2',
        initialVal: classes,
        setter: function(newVal) {
            console.log(newVal);
            for (var i in newVal) {
              render2.children('.'+i).val(newVal[i]);
            }
        }
    });

    nodecg.declareSyncedVar({ variableName: 'players',
        setter: function(newVal) {
            console.log(newVal);
        }
    });


    nodecg.declareSyncedVar({ variableName: 'Phase',
        setter: function(newVal) {
            console.log(newVal);
            $('#Phase').val(newVal);
        }
    });

    nodecg.declareSyncedVar({ variableName: 'showPickban',
        initialVal: false,

        setter: function(newVal) {
            console.log(newVal);
            if (newVal) {
              $('#housecup-pickban-show').removeClass('btn-default').addClass('btn-success');
            } else {
              $('#housecup-pickban-show').removeClass('btn-success').addClass('btn-default');

            }
        }
    });

    $("#housecup-pickban-show").click(function () {
      nodecg.variables.showPickban = !nodecg.variables.showPickban
    });

    $("#housecup-pickban-reset").click(function () {
         nodecg.variables.classes1 = orig;
         nodecg.variables.classes2 = orig;
         nodecg.variables.Phase = 1;
     });

     $("#housecup-pickban-start").click(function () {
       nodecg.sendMessage('StartPhase');
      });



    var klass = ['druid', 'hunter', 'mage', 'paladin', 'priest', 'rogue', 'shaman', 'warlock', 'warrior'];

    $.each(klass, function (index, value) {
        $(render).append('<select id="'+value+'" class="'+value+' pickbans">' +
                          '<option value="on" selected>On</option>' +
                          '<option value="rekt">Ban</option>' +
                          '<option value="notrekt">Pick</option>' +
                          '<option value="lost">Lost</option>' +
                        '</select>'
        );
        $(render2).append('<select id="'+value+'" class="'+value+' pickbans">' +
                          '<option value="on">On</option>' +
                          '<option value="rekt">Ban</option>' +
                          '<option value="notrekt">Pick</option>' +
                          '<option value="lost">Lost</option>' +
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
