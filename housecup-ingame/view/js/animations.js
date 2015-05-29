var currentstate = "";

function dropAllBanners() {
  playerBanners[0].drop();
  playerBanners[1].drop();
  playerBanners[2].drop();
  playerBanners[3].drop();

}

function setState(s) {
  if (s != currentstate) {

    if (s == "off") {
      setBanner(0, "off");
      setBanner(1, "off");
      setPlayfield(0, "off");
      setPlayfield(1, "off");
      setMulligan(0, "off");
      setMulligan(1, "off");
      document.body.className = "";
      // playerBanners[0].drop();
      // playerBanners[1].drop();
      // playerBanners[2].drop();
      // playerBanners[3].drop();

      doLight(lights[0], {angle:0.6, exponent: 70, intensity: 0}, {x:500, y:500, z:900}, 2000, 0);
      doLight(lights[1], {angle:0.6, exponent: 70, intensity: 0}, {x:720, y:700, z:900}, 2000, 0);
      doLight(lights[2], {angle:0.6, exponent: 70, intensity: 0}, {x:500, y:500, z:900}, 2000, 0);
      doLight(lights[3], {angle:0.6, exponent: 70, intensity: 0}, {x:720, y:700, z:900}, 2000, 0);
      doLight(lights[4], {intensity: 0}, {}, 2000, 0);

    }

    if (s == "pp1") { // Player presentation
      setBanner(0, "pp1");
      setBanner(1, "pp1");
      setPlayfield(0, "off");
      setPlayfield(1, "off");
      setMulligan(0, "off");
      setMulligan(1, "off");
      document.body.className = "pp1";

      setTimeout(function () {
        if (playerBanners[0].on == false) playerBanners[0].reset();

      },1000);
      setTimeout(function () {
        if (playerBanners[2].on == false) playerBanners[2].reset();

      },1500);


      doLight(lights[0], {angle:0.4, exponent: 70, intensity: 1.7}, {x:900, y:700, z:900}, 2000, 0);
      doLight(lights[1], {angle:0.4, exponent: 70, intensity: 0.2}, {x:720, y:700, z:700}, 2000, 0);
      doLight(lights[2], {angle:0.4, exponent: 70, intensity: 1.7}, {x:900, y:700, z:900}, 2000, 0);
      doLight(lights[3], {angle:0.4, exponent: 70, intensity: 0.2}, {x:720, y:700, z:700}, 2000, 0);
      doLight(lights[4], {intensity: 0}, {}, 2000, 0);
    }

    if (s == "pp2") { // Player presentation
      setBanner(0, "pp2");
      setBanner(1, "pp2");
      setPlayfield(0, "off");
      setPlayfield(1, "off");
      setMulligan(0, "off");
      setMulligan(1, "off");
      document.body.className = "pp2";

      setTimeout(function () {
        if (playerBanners[1].on == false) playerBanners[1].reset();
      },1000);
      setTimeout(function () {
        if (playerBanners[3].on == false) playerBanners[3].reset();

      },1500);

      doLight(lights[0], {angle:0.4, exponent: 70, intensity: 0.2}, {x:500, y:700, z:700}, 2000, 0);
      doLight(lights[1], {angle:0.4, exponent: 70, intensity: 1.7}, {x:720, y:700, z:900}, 2000, 0);
      doLight(lights[2], {angle:0.4, exponent: 70, intensity: 0.2}, {x:500, y:700, z:700}, 2000, 0);
      doLight(lights[3], {angle:0.4, exponent: 70, intensity: 1.7}, {x:720, y:700, z:900}, 2000, 0);
      doLight(lights[4], {intensity: 0}, {}, 2000, 0);

    }

    if (s == "ppw") { // Player presentation
      setBanner(0, "ppw");
      setBanner(1, "ppw");
      setPlayfield(0, "off");
      setPlayfield(1, "off");
      setMulligan(0, "off");
      setMulligan(1, "off");
      document.body.className = "ppw";

      doLight(lights[0], {angle:0.6, exponent: 70, intensity: 1.6}, {x:500, y:500, z:900}, 2000, 0);
      doLight(lights[1], {angle:0.6, exponent: 70, intensity: 1.6}, {x:720, y:700, z:900}, 2000, 0);
      doLight(lights[2], {angle:0.6, exponent: 70, intensity: 1.6}, {x:500, y:500, z:900}, 2000, 0);
      doLight(lights[3], {angle:0.6, exponent: 70, intensity: 1.6}, {x:720, y:700, z:900}, 2000, 0);
      doLight(lights[4], {intensity: 0}, {}, 2000, 0);


    }

    if (s == "ingame" || s == "decks") { // Ingame
      setIngameActive(s);
      document.body.className = s;

    }

    if (s == "mulligan") { // Mulligan
      setBanner(0, "mulligan");
      setBanner(1, "mulligan");
      setPlayfield(0, "off");
      setPlayfield(1, "off");
      setMulligan(0, "mulligan");
      setMulligan(1, "mulligan");
      document.body.className = "mulligan";

      if (playerBanners[0].on == false) playerBanners[0].reset();
      if (playerBanners[1].on == false) playerBanners[1].reset();
      if (playerBanners[2].on == false) playerBanners[2].reset();
      if (playerBanners[3].on == false) playerBanners[3].reset();

      doLight(lights[0], {angle:0.8, exponent: 70, intensity: 1.9}, {x:640, y:700, z:700}, 2000, 0);
      doLight(lights[1], {angle:0.8, exponent: 70, intensity: 1.9}, {x:640, y:700, z:700}, 2000, 0);
      doLight(lights[2], {angle:0.4, exponent: 70, intensity: 0}, {x:500, y:700, z:700}, 2000, 0);
      doLight(lights[3], {angle:0.4, exponent: 70, intensity: 0}, {x:720, y:700, z:700}, 2000, 0);
      doLight(lights[4], {intensity: 0.8}, {}, 2000, 0);


    }

    currentstate = s;
  }
}

function setIngameActive(s) {
  if (s != "ingame" && s != "decks") return;

  doLight(lights[0], {angle:0.4, exponent: 70}, {x:640, y:900, z:1200}, 2000, 0);
  doLight(lights[1], {angle:0.4, exponent: 70}, {x:640, y:900, z:1200}, 2000, 0);
  doLight(lights[2], {angle:0.4, exponent: 70, intensity: 0}, {x:500, y:700, z:700}, 2000, 0);
  doLight(lights[3], {angle:0.4, exponent: 70, intensity: 0}, {x:720, y:700, z:700}, 2000, 0);
  doLight(lights[4], {intensity: 0}, {}, 2000, 0);


  if (playerBanners[0].on == false) playerBanners[0].reset();
  if (playerBanners[1].on == false) playerBanners[1].reset();
  if (playerBanners[2].on == false) playerBanners[2].reset();
  if (playerBanners[3].on == false) playerBanners[3].reset();

  var activeplayer = (typeof nodecg.variables.turn != 'undefined') ? nodecg.variables.turn : 1;

  setBanner(0, (s=="ingame")?"ingame":"decks");
  setBanner(1, (s=="ingame")?"ingame":"decks");
  setMulligan(0, "off");
  setMulligan(1, "off");
  if (activeplayer == 1) {
    setPlayfield(0, "ingame");
    setPlayfield(1, "off");
    doLight(lights[0], {intensity: 2.2}, {}, 2000, 0);
    doLight(lights[1], {intensity: 0.5}, {}, 2000, 0);
  } else {
    setPlayfield(0, "off");
    setPlayfield(1, "ingame");
    doLight(lights[0], {intensity: 0.5}, {}, 2000, 0);
    doLight(lights[1], {intensity: 2.2}, {}, 2000, 0);
  }
}


function setBanner(i, pos) {
  var flag = flagpoles[i];

  var position = {};
  var scale = {};
  var rotation = {};

  var time = 1000;

  if (pos == "ingame") {
    position = {x:-30, y:710, z:0};
    scale = {x:1, y:1, z:1};
    rotation = {x:0, y:0.9, z:0};

    if (i == 1) {
      position.x = 1280-position.x;
      rotation.y = -rotation.y;
    }
  }

  if (pos == "decks") {
    position = {x:-10, y:730, z:0};
    scale = {x:0.8, y:0.8, z:0.8};
    rotation = {x:0, y:0.2, z:0};

    if (i == 1) {
      position.x = 1280-position.x;
      rotation.y = -rotation.y;
    }
  }

  if (pos == "mulligan") {
    position = {x:190, y:670, z:200};
    scale = {x:0.7, y:0.7, z:0.7};
    rotation = {x:0, y:0.9, z:0};

    if (i == 1) {
      position.x = 1280-position.x;
      position.y = 430;
      rotation.y = -rotation.y;
    }
  }

  if (pos == "pp1") {
    position = {x:500, y:600, z:300};
    scale = {x:0.8, y:0.8, z:0.8};
    rotation = {x:0, y:0.5, z:0};

    if (i == 1) {
      position = {x:1000, y:400, z:-400};
      scale = {x:0.8, y:0.8, z:0.8};
      rotation = {x:0, y:-0.5, z:0};
    }
  }

  if (pos == "pp2") {
    position = {x:200, y:400, z:-400};
    scale = {x:0.8, y:0.8, z:0.8};
    rotation = {x:0, y:0.5, z:0};

    if (i == 1) {
      position = {x:800, y:600, z:300};
      scale = {x:0.8, y:0.8, z:0.8};
      rotation = {x:0, y:-0.5, z:0};
    }
  }

  if (pos == "ppw") {
    position = {x:400, y:590, z:200};
    scale = {x:0.8, y:0.8, z:0.8};
    rotation = {x:0, y:-0.1, z:0};

    if (i == 1) {
      position = {x:850, y:600, z:220};
      scale = {x:0.8, y:0.8, z:0.8};
      rotation = {x:0, y:0.1, z:0};
    }
  }

  if (pos == "off") {
    position = {x:-200, y:690, z:0};
    scale = {x:1, y:1, z:1};
    rotation = {x:0, y:2, z:0};

    if (i == 1) {
      position.x = 1280-position.x;
      rotation.y = -rotation.y;
    }
  }

  doAnimation (flag, position, scale, rotation, time);
}

function setPlayfield(i, pos) {
  var screen = playerScreens[i];
  var peek = playerPeek[(i == 1) ? 0:1];

  //playerPeek[0].rotation.x = 1.5

  var position = {};
  var scale = {};
  var rotation = {};
  var peekY = 0;
  var peekDelay = 0;

  var time = 230;
  var delay = 0;

  if (pos == "ingame") {
    peekY = 1020;
    peekDelay = 1000;

    position = {x:640, y:360, z:-1000};
    scale = {x:2.15, y:2.15, z:2.15};
    rotation = {x:0, y:0, z:0};
  }

  if (pos == "off") {
    peekY = 1220;
    peekDelay = 0;
    position = {x:-800, y:450, z:-800};
    scale = {x:0.4, y:0.4, z:0.4};
    rotation = {x:0, y:Math.PI/2, z:0};
    if (i == 1) {
      position.x = 1280-position.x;
      rotation.y = -rotation.y;
    }
  }

  if (currentstate != "ingame" && currentstate != "decks") {
    delay = 1000;
    time = 600;
  }

  doAnimation (screen, position, scale, rotation, time, delay);
  doAnimation (peek, {y: peekY}, {}, {}, 1000, peekDelay);
}

function setMulligan(i, pos) {
  var screen = playerMulligan[i];

  var position = {};
  var scale = {};
  var rotation = {};

  var time = 700;

  if (currentstate != "mulligan") {
    delay = 2000;
    time = 2500;
  }

  if (pos == "mulligan") {
    position = {x:620, y:700, z:-1000};
    scale = {x:2, y:2, z:2};
    rotation = {x:0.2, y:0, z:0};

    if (i == 1) {
      position.y = 720-position.y;
      rotation.x = -rotation.x;
    }
  }

  if (pos == "off") {
    position = {x:640, y:2000, z:-1000};
    scale = {x:1.7, y:1.7, z:1.7};
    rotation = {x:Math.PI, y:0, z:0};

    if (i == 1) {
      position.y = 720-position.y;
      rotation.x = -rotation.x;
    }
  }



  doAnimation (screen, position, scale, rotation, time);
}

function setGroupColor (group, intencity) {
    for (var i in group.children) {
      var e = group.children[i];
      if (e instanceof THREE.Mesh) e.material.color.set(intencity, intencity, intencity);
      if (e instanceof THREE.Object3D) setGroupColor(e, intencity);
    }
}



function doAnimation (e, p, s, r, t, delay, callback) {
  if (!delay) var delay = 0;
  new TWEEN.Tween(e.position).to(p, t).easing(TWEEN.Easing.Cubic.InOut).delay(delay).start();
  new TWEEN.Tween(e.scale).to(s, t).easing(TWEEN.Easing.Cubic.InOut).delay(delay).start();
  new TWEEN.Tween(e.rotation).to(r, t).easing(TWEEN.Easing.Cubic.InOut).delay(delay).start();
  if (callback) setTimeout(callback, t, e);
}

function doLight (e, d, p, t, delay, callback) {
  if (!delay) var delay = 0;
  new TWEEN.Tween(e).to(d, t).easing(TWEEN.Easing.Cubic.InOut).delay(delay).start();
  new TWEEN.Tween(e.position).to(p, t).easing(TWEEN.Easing.Cubic.InOut).delay(delay).start();
  if (callback) setTimeout(callback, t, e);
}
