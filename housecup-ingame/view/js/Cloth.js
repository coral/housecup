/*
* Cloth Simulation using a relaxed constrains solver
*/

// Suggested Readings

// Advanced Character Physics by Thomas Jakobsen Character
// http://freespace.virgin.net/hugo.elias/models/m_cloth.htm
// http://en.wikipedia.org/wiki/Cloth_modeling
// http://cg.alexandra.dk/tag/spring-mass-system/
// Real-time Cloth Animation http://www.darwin3d.com/gamedev/articles/col0599.pdf

var DAMPING = 0.03;
var DRAG = 1 - DAMPING;
var MASS = .1;
var restDistance = 25;


var xSegs = 10; //
var ySegs = 23; //

var clothFunction = plane(restDistance * xSegs, restDistance * ySegs);


var GRAVITY = 981 * 1.4; //
var gravity = new THREE.Vector3( 0, -GRAVITY, 0 ).multiplyScalar(MASS);


var TIMESTEP = 18 / 1000;
var TIMESTEP_SQ = TIMESTEP * TIMESTEP;

var shake = 0;








function plane(width, height) {

	return function(u, v) {
		var x = (u-0.5) * width;
		var y = 0.5 * height + (1-v) * height * 0.2;
		var z = -(1-v) * height * 0.5;

		return new THREE.Vector3(x, y, z);
	};
}

function Particle(x, y, z, mass) {
	this.position = clothFunction(x, y); // position
	this.previous = clothFunction(x, y); // previous
	this.original = clothFunction(x, y);
	this.a = new THREE.Vector3(0, 0, 0); // acceleration
	this.mass = mass;
	this.invMass = 1 / mass;
	this.tmp = new THREE.Vector3();
	this.tmp2 = new THREE.Vector3();
}

// Force -> Acceleration
Particle.prototype.addForce = function(force) {
	this.a.add(
		this.tmp2.copy(force).multiplyScalar(this.invMass)
	);
};


// Performs verlet integration
Particle.prototype.integrate = function(timesq) {
	var newPos = this.tmp.subVectors(this.position, this.previous);
	newPos.multiplyScalar(DRAG).add(this.position);
	newPos.add(this.a.multiplyScalar(timesq));

	this.tmp = this.previous;
	this.previous = this.position;
	this.position = newPos;

	this.a.set(0, 0, 0);
}


var diff = new THREE.Vector3();

function satisifyConstrains(p1, p2, distance) {
	diff.subVectors(p2.position, p1.position);
	var currentDist = diff.length();
	if (currentDist==0) return; // prevents division by 0
	var correction = diff.multiplyScalar(1 - distance/currentDist);
	var correctionHalf = correction.multiplyScalar(0.5);
	p1.position.add(correctionHalf);
	p2.position.sub(correctionHalf);
}


function Cloth(w, h, geometry) {

	this.tmpForce = new THREE.Vector3();

	this.running = true;

	this.pins = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

	this.windStrength = 0.01;
	this.windForce = new THREE.Vector3(0,0,0);

	this.on = true;

	w = w || 10;
	h = h || 10;
	this.w = w;
	this.h = h;

	this.lastTime;
	this.wind = true;

	var particles = [];
	var constrains = [];

	var u, v;

	// Create particles
	for (v=0;v<=h;v++) {
		for (u=0;u<=w;u++) {
			particles.push(
				new Particle(u/w, v/h, 0, MASS)
			);
		}
	}

	// Structural

	for (v=0;v<h;v++) {
		for (u=0;u<w;u++) {

			constrains.push([
				particles[index(u, v)],
				particles[index(u, v+1)],
				restDistance
			]);

			constrains.push([
				particles[index(u, v)],
				particles[index(u+1, v)],
				restDistance
			]);

		}
	}

	for (u=w, v=0;v<h;v++) {
		constrains.push([
			particles[index(u, v)],
			particles[index(u, v+1)],
			restDistance

		]);
	}

	for (v=h, u=0;u<w;u++) {
		constrains.push([
			particles[index(u, v)],
			particles[index(u+1, v)],
			restDistance
		]);
	}

	this.resetParticles = particles.slice(0);
	this.resetConstraints = constrains.slice(0);

	this.particles = particles;
	this.constrains = constrains;

	function index(u, v) {
		return u + v * (w + 1);
	}

	this.index = index;

	this.copyToGeometry = function () {
		var p = this.particles;


		for ( var i = 0, il = p.length; i < il; i ++ ) {

			this.geometry.vertices[ i ].copy( p[ i ].position );

		}

		this.geometry.computeFaceNormals();
		this.geometry.computeVertexNormals();

		this.geometry.normalsNeedUpdate = true;
		this.geometry.verticesNeedUpdate = true;

	}

	this.simulate = function (time) {
		if (!this.running) return;
		if (!this.lastTime) {
			this.lastTime = time;
			return;
		}

		var i, il, particles, particle, pt, constrains, constrain;

		// Aerodynamics forces
		if (this.wind) {
			var face, faces = this.geometry.faces, normal;

			particles = this.particles;

			for (i=0,il=faces.length;i<il;i++) {
				face = faces[i];
				normal = face.normal;

				this.tmpForce.copy(normal).normalize().multiplyScalar(normal.dot(this.windForce));
				particles[face.a].addForce(this.tmpForce);
				particles[face.b].addForce(this.tmpForce);
				particles[face.c].addForce(this.tmpForce);
			}
		}

		for (particles = this.particles, i=0, il = particles.length
			;i<il;i++) {
				particle = particles[i];
				particle.addForce(gravity);

				particle.integrate(TIMESTEP_SQ);
				if (particle.position.y < -1500) {
					console.log("Paused cloth animation");
					this.running = false;
					return;
				}
			}

			// Start Constrains

			constrains = this.constrains,
			il = constrains.length;
			for (i=0;i<il;i++) {
				constrain = constrains[i];
				satisifyConstrains(constrain[0], constrain[1], constrain[2]);
			}


			// Pin Constrains
			for (i=0, il=this.pins.length;i<il;i++) {
				var xy = particles.length - this.pins[i] -1 ;
				var p = particles[xy];
				p.position.copy(p.original);
				p.previous.copy(p.original);


			}

			for (i=particles.length/3; i < particles.length*0.66;i++) {
				var p = particles[i];


				p.position.z += shake;
				p.previous.z += shake;
			}


		}

		this.reset = function () {
			this.on = true;
			this.running = true;
			this.pins = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
			for (var i in particles) {
				var p = particles[i];
				p.position.copy(p.original);
				p.previous.copy(p.original);
			}
		}

		this.drop = function () {
			this.pins = [ ];
			this.on = false;

		}


	}
