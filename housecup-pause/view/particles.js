var canvas;
var context;
var proton;
var renderer;
var emitter;
var stats;
var mouseObj;
var attractionForce;

Main();
function Main() {
	canvas = document.getElementById("particles");
	loadImage();
	context = canvas.getContext('2d');
	context.globalCompositeOperation = "lighter";
	mouseObj = {
		x : canvas.width / 2,
		y : canvas.height / 2
	};
}


function loadImage() {
	var image = new Image()
	image.onload = function(e) {
		createProton(e.target);
		tick();
		canvas.addEventListener('mousedown', mouseDownHandler, false);
	}
	image.src = 'img/particle.png';
}

function createProton(image) {
				proton = new Proton;
				emitter = new Proton.Emitter();
				emitter.rate = new Proton.Rate(new Proton.Span(0.1, 0.3), new Proton.Span(.05, .2));
				emitter.addInitialize(new Proton.ImageTarget(image));
				emitter.addInitialize(new Proton.Mass(1));
				emitter.addInitialize(new Proton.Life(2, 3));
				emitter.addInitialize(new Proton.V(new Proton.Span(0.5, 1.5), new Proton.Span(0, 360), 'polar'));
				emitter.addBehaviour(new Proton.Alpha(1, [.7, 1]));
				emitter.addBehaviour(new Proton.Scale(1, 0));
				emitter.addBehaviour(new Proton.Color('#FFFFFF', '#FFFF00', Infinity, Proton.easeInSine));
				emitter.p.x = (canvas.width / 2);
				emitter.p.y = (canvas.height / 2)-110;
				emitter.emit();
				proton.addEmitter(emitter);

				renderer = new Proton.Renderer('canvas', proton, canvas);
				renderer.start();
}

function mouseDownHandler(e) {
	attractionForce.reset(mouseObj, 0, 200);

	setTimeout(function() {
		attractionForce.reset(mouseObj, 10, 200);
	}, 500);
}

function tick() {
	requestAnimationFrame(tick);

	if (proton)
		proton.update();
}
