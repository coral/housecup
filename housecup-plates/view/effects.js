var canvas;
var context;
var proton;
var renderer;
var emitter;
var stats;
var mouseObj;
var bgImg;
var repulsionBehaviour, crossZoneBehaviour;

$( document ).ready(function() {
    Main();
});

function Main() {
    canvas = document.getElementById("platefx");
    console.log(canvas);
    context = canvas.getContext('2d');
    beginScene();
}

function beginScene() {
    createProton();
    createRenderer();
    tick();
}

function createProton() {
    proton = new Proton;
    emitter = new Proton.Emitter();
    emitter.damping = 0.0075;
    emitter.rate = new Proton.Rate(30);
    emitter.addInitialize(new Proton.ImageTarget('img/particle/particle.png', 32));
    emitter.addInitialize(new Proton.Position(new Proton.RectZone(0, 0, 1000, 65)));
    emitter.addInitialize(new Proton.Mass(1), new Proton.Radius(Proton.getSpan(5, 10)));
    repulsionBehaviour = new Proton.Repulsion(mouseObj, 0, 0);
    crossZoneBehaviour = new Proton.CrossZone(new Proton.RectZone(-2, 0, 1000, 65), 'cross');
    emitter.addBehaviour(repulsionBehaviour, crossZoneBehaviour);
    emitter.addBehaviour(new Proton.Scale(Proton.getSpan(.1, .6)));
    emitter.addBehaviour(new Proton.Alpha(1));
    emitter.addBehaviour(new Proton.RandomDrift(10, 10, .2));
    emitter.addBehaviour({
        initialize : function(particle) {
            particle.tha = Math.random() * Math.PI;
            particle.thaSpeed = 0.015 * Math.random() + 0.005;
        },

        applyBehaviour : function(particle) {
            particle.tha += particle.thaSpeed;
            particle.alpha = Math.abs(Math.cos(particle.tha));
        }
    });
    emitter.emit('once');
    proton.addEmitter(emitter);
}



function createRenderer() {
    renderer = new Proton.Renderer('canvas', proton, canvas);
    renderer.onProtonUpdate = function() {
        context.clearRect ( 0 , 0 , canvas.width, canvas.height );
    };
    renderer.start();
}

function tick() {
    requestAnimationFrame(tick);

    proton.update();
}
