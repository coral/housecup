'use strict';

var nodecg = null;

var OscEmitter = require('osc-emitter')
  , emitter = new OscEmitter();
  var reconnect = require('reconnect-net');

  var str = null;
  reconnect(function (stream) {
    console.log("Connected to sound desk");
    str = stream;
  //stream.on('data', console.log);
  // => yup, I'm up!
}).connect({"host": "192.168.10.35", port: 51325});

module.exports = function (extensionApi, events) {

    nodecg = extensionApi;
    emitter.add('192.168.10.25', 10023);

    nodecg.declareSyncedVar({ variableName: 'turn',
        initialVal: 1,
        setter: function(state) {
            console.log(state);
        }
    });



    events.on('GAME', function (message) {
        if(message.data.event == "TURN" && message.data.data == true)
        {
            nodecg.variables.turn = message.computer;

            var buff = new Buffer();
            // if(message.computer == 1)
            // {
            //     emitter.emit('/auxin/03/mix/on', 1);
            //     emitter.emit('/auxin/04/mix/on', 1);
            //
            //     emitter.emit('/auxin/05/mix/on', 0);
            //     emitter.emit('/auxin/06/mix/on', 0);
            // }
            //
            // if(message.computer == 2)
            // {
            //     emitter.emit('/auxin/03/mix/on', 0);
            //     emitter.emit('/auxin/04/mix/on', 0);
            //
            //     emitter.emit('/auxin/05/mix/on', 1);
            //     emitter.emit('/auxin/06/mix/on', 1);
            // }
        }
        /*
        if(message.data.event == "TURN" && message.data.data == false)
        {
            nodecg.variables.turn = 2;
        } */
    });

}
