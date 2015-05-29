
var klass = ['druid', 'hunter', 'mage', 'paladin', 'priest', 'rogue', 'shaman', 'warlock', 'warrior'];

var arePlayer=true;
var currentPlayer = 0;

var maxSelected = 0;

var currentPick = "pick" //off, pick, ban





$( document ).ready(function() {

  nodecg.listenFor("startPickTimer", function function_name(data) {
    console.log(data);
    maxSelected = data.max;
    currentPick = data.side;
    $('.round').text(data.round);

    $('.marker').removeClass('selected');

    $('video')[0].currentTime = 0;
    $('video')[0].playbackRate = data.timerspeed;
    $('video')[0].play();
    $('audio')[0].currentTime = 0;
    $('audio')[0].play();

    $('body').css({backgroundColor: "inherit"});


  });

nodecg.declareSyncedVar({ variableName: 'classes1',
  setter: function(newVal) {
    $('video')[0].pause();
    $('video')[0].currentTime = 0;
    $('body').css({backgroundColor: "inherit"});


    $('#deck1 .deckimage').each(function( key, value ) {
      var n = value.className.split(" ")[0];

      $(value).children('.marker')[0].className = "marker " + newVal[n];


    });
    $('.marker.selected').removeClass('selected');
  }
});

nodecg.declareSyncedVar({ variableName: 'classes2',
setter: function(newVal) {


  $('#deck2 .deckimage').each(function( key, value ) {
    var n = value.className.split(" ")[0];

    $(value).children('.marker')[0].className = "marker " + newVal[n];


  });
  $('.marker.selected').removeClass('selected');

}
});

nodecg.declareSyncedVar({ variableName: 'data',
bundleName: 'housecup-ingame',
setter: function(newVal) {
  $(".p1").text(newVal.players[0].nick);
  $(".p2").text(newVal.players[1].nick);

  $(".you").text(newVal.players[currentPlayer].nick);
}
});

nodecg.declareSyncedVar({ variableName: 'showPickban',
initialVal: false,

setter: function(newVal) {
  console.log(newVal);
  if (newVal) {
    $("body").addClass('active');
  } else {
    $("body").removeClass('active');

  }


}
});

$('.deckimage').click(function () {
  var c = this.className.split(" ")[0];

  console.log(c);

  if (currentPick == "off") return;

  var pClicked = parseInt($(this).parent()[0].id.substring(4));

  console.log(pClicked);
  if (pClicked != currentPlayer + 1 && currentPick == "pick") return;
  if (pClicked == currentPlayer + 1 && currentPick == "ban") return;





  if ($(this).children('.marker').hasClass('rekt') || $(this).children('.marker').hasClass('notrekt')) {
    return;
  }

  if ($(this).children('.marker').hasClass('selected'))
  {
    $(this).children('.marker').removeClass('selected');
    return;
  }

  if ($('.deckimage .marker.selected').length >= maxSelected) return;

  $(this).children('.marker').addClass('selected');


});

$('#lockPick').click(function () {
sendPicks();
});




if (document.location.search) {
  if (parseInt(document.location.search.substring(1)) == 2) {
    currentPlayer = 1;
  }

  arePlayer = true;
  $('body').addClass('player');


}

$('video')[0].addEventListener('ended', function () {
  console.log('Fuse ended');
  //shake();
  if (!arePlayer) return;

  sendPicks();

});

});

function shake() {
  $(".container").addClass('shake shake-hard shake-constant')

  setTimeout(function function_name(argument) {
    $(".container").removeClass('shake shake-hard shake-constant');
  }, 1000)

}

function sendPicks () {

  if (maxSelected == 0) return;
  $('body').css({backgroundColor: "#f22"});


//Do random picks if player hasn't done them
  if ($('.deckimage .marker.selected').length != maxSelected) {
    var d = "#deck1";

    if (currentPlayer == 1 && currentPick == "pick" || currentPlayer == 0 && currentPick == "ban") {
      d = "#deck2";
    };

    var loop = maxSelected - $('.deckimage .marker.selected').length;

    for (var i = 0; i < loop; i++) {
      $(d + ' .marker').not(".selected").not('.rekt').not('.notrekt').random().addClass('selected');
    }

  };

  maxSelected = 0;
  currentPick = "off";

  var picks = [];

  $('.deckimage .marker.selected').each(function (key, value) {
    picks.push(value.parentNode.className.split(" ")[0]);
  });

  var o = {
    player: currentPlayer,
    picks: picks
  };

  console.log(o);

  nodecg.sendMessage("Picks", o);


}

$.fn.random = function() {
  return this.eq(Math.floor(Math.random() * this.length));
}
