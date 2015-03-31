var panel = $bundle.filter('.housecup-credits');

var start = $('#housecup-credits_start');
var stop = $('#housecup-credits_stop');

nodecg.declareSyncedVar({
	variableName: 'animate',
    initialVal: false
});

start.click(function () {
    nodecg.variables.animate = true;
});

stop.click(function () {
    nodecg.variables.animate = false;
});
