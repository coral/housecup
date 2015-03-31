module.exports = function(nodecg) {
    nodecg.declareSyncedVar({ variableName: 'isShowing', initialVal: false });
    nodecg.declareSyncedVar({ variableName: 'isPulsing', initialVal: false });
    nodecg.declareSyncedVar({ variableName: 'names', initialVal: {} });

    nodecg.listenFor('pulse', function pulse(duration) {
        // Don't stack pulses
        if (nodecg.variables.isPulsing)
             return;

        nodecg.variables.isShowing = true;
        nodecg.variables.isPulsing = true;

        // End pulse after "duration" seconds
        setTimeout(function() {
            nodecg.variables.isShowing = false;
            nodecg.variables.isPulsing = false;
        }, duration * 1000);
    });
};