var panel = $bundle.filter('.pause-panel');
var preview = panel.find('.js-preview');
var program = panel.find('.js-program');

var start = $('#housecup-countdown_start');
var stop = $('#housecup-countdown_stop');
var end = $('#housecup-countdown_end');

var large = $('#housecup-countdown_large');
var small = $('#housecup-countdown_small');
var hide = $('#housecup-countdown_hide');
var modify = $('.housecup-size_modify');

var datetimepickerz = panel.find('#datetimepicker12');


modify.click(function () {
    nodecg.variables.size = $(this).data("value");
});

start.click(function () {
    nodecg.variables.animate = true;
});

stop.click(function () {
    nodecg.variables.animate = false;
});

$('#countdown-to').datetimepicker({
                inline: true,
                sideBySide: false,
                format: "H HH m mm"
            });

$('#countdown-to').on("dp.change",function (e) {
    nodecg.variables.countdownTime = $('#countdown-to').data("DateTimePicker").date().toDate();
    console.log(nodecg.variables.countdownTime);
});


function updateNames() {
    nodecg.variables.names = {
        left: preview.find('.left').val(),
        right: preview.find('.right').val()
    };
}

nodecg.declareSyncedVar({ variableName: 'size',
    initialVal: "hide",
    setter: function(newVal) {
        console.log(newVal);
    }
});

nodecg.declareSyncedVar({ variableName: 'animate',
    initialVal: true,
    setter: function(newVal) {
        console.log(newVal);
    }
});

nodecg.declareSyncedVar({ variableName: 'countdownTime',
    initialVal: $('#countdown-to').data("DateTimePicker").date(),
    setter: function(newVal) {

    }
});

nodecg.declareSyncedVar({ variableName: 'countdownStatus',
    initialVal: {
        running: true
    },
    setter: function(newVal) {
        console.log(newVal);
    }
});

