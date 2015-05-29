var loader = new THREE.ColladaLoader();

var container, scene, camera, renderer, controls, stats;
var cube;

var videoIndex = 1;

var videoMaterials = [];
var peekMaterials = [];
var mulliganMaterials = [];
var peekMaterials = [];
var videoTextures = [];
var videoCanvas = [];
var videoElements = [];

var bannerTexts = [];

var cardMultipleMaterials = [];


var videoFrameUpdate = true;

var trackPoint;

var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '1280px';
stats.domElement.style.top = '0px';



$(function() {

	$('body').append( stats.domElement );


	$('button.gameout').click(function () {
		$('body').toggleClass('showgame');
	});

	$('button.camout').click(function () {
		$('body').toggleClass('showcams');
	});

	$('button.deck').click(function () {
		deck.view = (deck.view == "hidden") ? "fan":"hidden";
		deck.updateView();
	});

	$('button.delcard').click(function () {
		console.log("remove card "+ deck.cards[0].id);
		deck.removeCard(deck.cards[0].id);
		deck.updateView();
	});



	console.log('Initialize');
	init();

	console.log('Going to animate');
	animate();




});


function setTextureCropFromScale(element) {
	var map = element.material.map;
	var scale = element.scale;
	var aspect = scale.x/scale.y;

	if (aspect == 1) {
		map.repeat.x = 1;
		map.repeat.y = 1;
		map.offset.x = 0;
		map.offset.y = 0;
	} else if (aspect > 1) {
		aspect = scale.y/scale.x;

		console.log ('Cut top and bottom')
		map.repeat.x = 1;
		map.offset.x = 0;
		map.repeat.y = aspect;
		map.offset.y = (1-map.repeat.y)/2;
	} else {
		console.log ('Cut sides')
		map.repeat.y = 1;
		map.offset.y = 0;
		map.repeat.x = aspect;
		map.offset.x = (1-map.repeat.x)/2;

	}

}

function setTextureScale(texture, params) {

	texture.repeat.x = params.scale.x;
	texture.repeat.y = params.scale.y;
	texture.offset.x = params.offset.x;
	texture.offset.y = params.offset.y;
}

function render()
{
	renderer.render( scene, camera );
}

function updateVideo() {
	// if (!videoFrameUpdate) {
	// 	return;
	// 	console.log("Dropped frame");
	// }
	videoFrameUpdate = false;
	for (var i = 1; i <=4; i++) {
		videoCanvas[i].drawImage( videoElements[i], 0, 0, 1280, 720 );
		videoTextures[i].needsUpdate = true;
	}
	videoFrameUpdate = true;


}

function update()
{
	var time = Date.now();


	this.deck.animate();

	TWEEN.update();

	//setTimeout(updateVideo);
	updateVideo();

	for (var i in playerBanners) {
		playerBanners[i].simulate(time);
		playerBanners[i].copyToGeometry();

		playerBanners[i].windStrength = Math.cos( time / 6000 +77.3)/2;
		playerBanners[i].windForce.set( Math.sin( time / 1770 +88), Math.cos( time / 3000 ), Math.sin( time / 1000 ) ).normalize().multiplyScalar( playerBanners[i].windStrength );

	}

 //if (currentstate == "ingame") track();

}

function track() {
	var imgData=videoCanvas[1].getImageData(1050,125,48,48);

	var pos;
	var currentlow = 1000000000;
	var currentX, currentY;

	for (var x = 0; x < 36; x++) {
		for (var y = 0; y < 36; y++) {
				var d = 0;

				for (var xx = 0; xx < 12; xx+=3) {
					for (var yy = 0; yy < 12; yy+=3) {
						d += diffTrack(imgData.data[((y+yy) * 48 + x + xx)*4 + 1], trackPoint.data[(yy * 12 + xx)*4 + 1]);

					}
				}

				if (d < currentlow) {
					currentlow = d;
					currentX = x;
					currentY = y;
				}

		}
	}


	if (currentlow < 400) {

		var dif = 19 - currentX+17 - currentY;

		shake = dif*2;

	}
}

function diffTrack(a,b){return Math.abs(a-b);}

function setupTracker() {
	trackPoint = document.getElementById('trackPoint').getContext('2d');

	var img = new Image();
	  img.src = 'img/trackpoint.png';

	  img.onload = function(){
			trackPoint.drawImage(img,0,0);
			trackPoint=trackPoint.getImageData(0,0,12,12);
	  };
}

function animate()
{
	requestAnimationFrame( animate );
	stats.begin();
	render();
	update();
	stats.end();
}

function gotMedia(list) {
	console.log(list);

	for (var i in list) {
		if (list[i].label.startsWith("Blackmagic WDM")) {
			console.log(list[i].label);

			var constraints = {
				video: {
					optional: [{
						sourceId: list[i].id
					}]
				}
			};

			navigator.webkitGetUserMedia(constraints, gotUserMedia, failUserMedia);
		}
	}
}

function gotUserMedia(stream) {
	console.log(stream);

	var index = videoIndex++;
	var elem = document.getElementById('video' + index);
	elem.src = window.URL.createObjectURL(stream);

}

function failUserMedia() {

}

function getVideoTextures() {

	for (var index = 1; index <= 2; index++) {
		var elem = document.getElementById('videoCanvas' + index);
		videoElements[index] = document.getElementById('video' + index);


		videoCanvas[index] = elem.getContext( '2d' );

		videoTextures[index] = new THREE.Texture( elem );
		videoTextures[index].minFilter = THREE.LinearFilter;
		videoTextures[index].magFilter = THREE.LinearFilter;

		videoMaterials[index] = new THREE.MeshBasicMaterial( { map: videoTextures[index], side:THREE.DoubleSide, transparent: true} );
		mulliganMaterials[index] = new THREE.MeshBasicMaterial( { map: videoTextures[index], side:THREE.DoubleSide, transparent: true} );
		peekMaterials[index] = new THREE.MeshBasicMaterial( { map: videoTextures[index], side:THREE.DoubleSide, transparent: true, depthWrite: false} );
	}

	for (var index = 3; index <= 4; index++) {
		var elem = document.getElementById('videoCanvas' + index);
		videoElements[index] = document.getElementById('video' + index);


		videoCanvas[index] = elem.getContext( '2d' );

		videoTextures[index] = new THREE.Texture( elem );
		videoTextures[index].minFilter = THREE.LinearFilter;
		videoTextures[index].magFilter = THREE.LinearFilter;

		videoMaterials[index] = new THREE.MeshPhongMaterial( { alphaTest: 0.5, ambient: 0xffffff, color: 0xffffff, specular: 0x030303, emissive: 0x111111, shiness: 10, map: videoTextures[index],  side: THREE.DoubleSide });
	}

	var elem = document.getElementById('leftBannerText');
	bannerTexts[0] = {};
	bannerTexts[0].element = elem;
	bannerTexts[0].canvas = elem.getContext( '2d' );
	bannerTexts[0].texture = new THREE.Texture( elem );
	bannerTexts[0].texture.minFilter = THREE.LinearFilter;
	bannerTexts[0].texture.magFilter = THREE.LinearFilter;

	bannerTexts[0].material = new THREE.MeshPhongMaterial( { map: bannerTexts[0].texture, transparent: true});
	bannerTexts[0].texture.needsUpdate = true;

	var elem = document.getElementById('rightBannerText');
	bannerTexts[1] = {};
	bannerTexts[1].element = elem;
	bannerTexts[1].canvas = elem.getContext( '2d' );
	bannerTexts[1].texture = new THREE.Texture( elem );
	bannerTexts[1].texture.minFilter = THREE.LinearFilter;
	bannerTexts[1].texture.magFilter = THREE.LinearFilter;

	bannerTexts[1].material = new THREE.MeshPhongMaterial( { map: bannerTexts[1].texture, transparent: true});
	bannerTexts[1].texture.needsUpdate = true;

}

function drawBannerText(banner, texts) {
	bannerTexts[banner].canvas.clearRect(0, 0, bannerTexts[banner].element.width, bannerTexts[banner].element.height);

	var elem = document.getElementById("logo-" + texts.image);

	if (elem) bannerTexts[banner].canvas.drawImage( elem, 0, 0, 300, 733 );

	bannerTexts[banner].canvas.font='bold 33px "Geogtq-Bd"';
	bannerTexts[banner].canvas.textAlign = 'center';
	bannerTexts[banner].canvas.fillStyle = '#000';
	bannerTexts[banner].canvas.fillText(texts.nick.toUpperCase(),150,470);

	bannerTexts[banner].canvas.font='27px "Geogtq-Md"';
	bannerTexts[banner].canvas.textAlign = 'center';
	bannerTexts[banner].canvas.fillStyle = '#000';
	bannerTexts[banner].canvas.fillText(texts.name.toUpperCase(),150,500);

	bannerTexts[banner].canvas.font='80px "Geogtq-Bd"';
	bannerTexts[banner].canvas.textAlign = 'center';
	bannerTexts[banner].canvas.fillStyle = '#000';
	bannerTexts[banner].canvas.fillText(texts.wins,150,640);

	bannerTexts[banner].canvas.lineWidth = 2;

	bannerTexts[banner].canvas.miterLimit = 2;
	bannerTexts[banner].canvas.lineJoin = 'circle';

	bannerTexts[banner].canvas.strokeStyle = '#fff';
	bannerTexts[banner].canvas.strokeText(texts.wins,150,640);

	bannerTexts[banner].texture.needsUpdate = true;

}

function init() {
	MediaStreamTrack.getSources(gotMedia);
	getVideoTextures();


	var SW = 1280, SH = 720;
	scene = new THREE.Scene();
	var SCREEN_WIDTH = 1280, SCREEN_HEIGHT = 720;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 2, FAR = 5000;


	camera = new THREE.PerspectiveCamera(45,ASPECT, 0.1, 4000);
	camera.position.z = 869;
	camera.position.x = 640;
	camera.position.y = 360;



	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true});

	renderer.setSize(SW, SH);


	var light = new THREE.AmbientLight( 0x333333 ); // soft white light
	scene.add( light );

	// directionalLight = new THREE.PointLight( 0xFFFFFF, 0.2 );
	// directionalLight.position.set( 640, 400, -200 );
	// //directionalLight.target.position.set( 640, 360, 0 );
	// scene.add( directionalLight );

	for (var i = 0; i < 7 ; i++) {
		var temp = THREE.ImageUtils.loadTexture( 'img/cardmulti/' + (i+1) + '.png' );
		cardMultipleMaterials[i] = new THREE.MeshBasicMaterial({map: temp, transparent: true});
	}



	this.deck = new Deck (scene);

	setupUserElements();


	$('#3d-foreground').append(renderer.domElement);

	setupTracker();

}

if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function (str){
		return this.slice(0, str.length) == str;
	};
}
