var angle = 0;
var secondsColor = 'hsla(180, 85%, 5%, .7)';
var minutesColor = 'hsla(180, 95%, 15%, 1)';
var hoursColor = 'hsla(180, 75%, 25%, 1)';

var proton;
var renderer;
var emitter;
var stats;
var mouseObj;
var attractionForce;
var newtime;

nodecg.declareSyncedVar({
    name: 'size',
    setter: function(newVal) {

      $(".viewport").removeClass('anim-size-large');
      $(".viewport").removeClass('anim-size-hidden');
      $(".viewport").removeClass('anim-size-small');

      $(".viewport").addClass("anim-size-" + newVal);
    }
});

nodecg.declareSyncedVar({
    name: 'animate',
    initialVal: true,
    setter: function(newVal) {
    	if(newVal) {
    		window.requestAnimationFrame(updateTime);
            rekt(new Date(nodecg.variables.countdownTime));
    	}
    }
});

nodecg.declareSyncedVar({ variableName: 'countdownTime',
    setter: function(newVal) {
    	newtime = newVal;
    }
});




var c = document.getElementById('canv');
var ctx = c.getContext('2d');
var tsRef;

//dmRef.setSeconds(dmRef.getSeconds() + 20);

function rekt(timez) {

        //console.log("TIME: " + timez);
 tsRef = countdown(new Date(), timez);
 console.log(tsRef);
 tsRef = Math.round(tsRef.value/1000);
}

//tick();

function updateTime(){
	var radgrad = ctx.createRadialGradient(250,250,.5,250,250,250);
	radgrad.addColorStop(0, 'hsla(219, 55%, 55%, 1)');
	radgrad.addColorStop(1, 'hsla(219, 75%, 25%, 1)');
	ctx.fillStyle = radgrad;
	ctx.fillRect( 0, 0, c.width, c.height );

	ts = countdown(new Date(), new Date(nodecg.variables.countdownTime));
	tsCount = (ts.value/1000);

	currentSec = ts.seconds;
	currentMin = ts.minutes;
	currentHr = ts.hours;
	if(currentHr == 0)
	{
		var realTime = numPad0( currentMin ) + ':' + numPad0( currentSec );
	} else {
		var realTime = currentHr + ':' + numPad0( currentMin ) + ':' + numPad0( currentSec );
	}


	if (currentMin == 0 && currentSec == 0 && currentHr == "0")
	{
		var realTime = "PARTYTIME";
		nodecg.variables.animate = false;
	}
	//console.log(currentHr + " " + currentMin + " " +  currentSec);

	if(currentMin == 0 && currentSec == 0 && currentHr == "0")
	{
		drawSeconds(tsRef, tsCount, 0);
	} else {
		drawSeconds(tsRef, tsCount);
	}
	if(nodecg.variables.animate)
	{
		window.requestAnimationFrame(updateTime);
	}



	var textPosX = 245 - ( ctx.measureText(realTime).width / 2 );
  ctx.shadowColor = 'hsla(180, 100%, 5%, 1)';
  ctx.shadowBlur = 100;
  ctx.shadowOffsetX = 12;
  ctx.shadowOffsetY = 0;
	ctx.fillStyle =  'hsla(255,255%,255%,.7)';
	ctx.font = "bold 48px 'Geogrotesque', serif";
	ctx.fillText( realTime, textPosX, 415);
}

/*
function tick() {
	requestAnimationFrame(tick);
	updateTime();
}
*/

function drawSeconds(ref, count, override){
	if(typeof(override)==='undefined') {
		angle = (360/ref)*count;
	} else {
		angle = 0;
	}

	ctx.fillStyle = secondsColor;
	ctx.beginPath();
	ctx.moveTo( 250, 250 );
	ctx.lineTo( 250, 50 );
	ctx.arc( 250, 250, 200, calcDeg( 0 ), calcDeg( angle ), false );
	ctx.lineTo( 250, 250 );
   ctx.shadowColor = 'hsla(180, 45%, 5%, .4)';
   ctx.shadowBlur =15;
   ctx.shadowOffsetX = 15;
   ctx.shadowOffsetY = 15;
	ctx.fill();
}



function calcDeg( deg ){
	return (Math.PI/180) * (deg - 90);
}

function numPad0( str ){
	var cStr = str.toString();
	if( cStr.length < 2 ){
		 str = 0 + cStr;
	}
	return str;
}
