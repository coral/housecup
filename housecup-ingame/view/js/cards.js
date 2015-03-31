function Deck (scene) {


  this.animate = function () {

  }

  this.animateTo = function(card, position, scale, rotation, time) {
    new TWEEN.Tween( card.object.position).to( position, time )
    .start();
    new TWEEN.Tween( card.object.scale).to( {x: scale, y: scale}, time )
    .start();
    if (rotation) {
      new TWEEN.Tween( card.object.rotation).to( rotation, time )
      .start();
    }
  }

  this.updateView = function () {
    if (this.view == "hidden") {
      for (var i in this.cards)
      this.animateTo(this.cards[i], {x:640, y:-200}, 0.2, {x: 1.5, y: 0, z: 0},  700);
    }

    if (this.view == "fan") {
      var count = this.cards.length;

      rows = 1
      if (count > 5) rows = 2;
      if (count > 16) rows = 3;
      if (count > 30) rows = 4;

      cols = Math.ceil(count/rows);



      for (var i in this.cards) {

        var noinrow = i%cols;
        var rowno = Math.floor(i/cols);

        //console.log(noinrow);
        //console.log(rowno);

        var angle = (noinrow+1)/(cols + 1)-0.5;

        console.log(angle);



        //var x = (1280/(cols+1))*(noinrow+1);
        var y = (800/(rows+1))*(rowno+1)-70;
        var x = Math.sin(angle)*1400+640;

        var z = -Math.cos(angle)*1400+1300;
        //console.log((1/(cols+1))*(noinrow+1)-2);

        var scale = 0.3 + 0.55 / rows;

        var roty = -angle;

        this.animateTo(this.cards[i], {x:x, y:760-y, z: z}, scale, {x: 0, y: roty,  z: 0}, 700);

      }
    }

    this.removeCard = function (i) {
      var obj = this.cards[i].object;

      new TWEEN.Tween( obj.children[0].rotation).to( {x: 1.5, y: 1}, 500 )
      .start();
      new TWEEN.Tween( obj.children[1].rotation).to( {x: 1.5, y: 1}, 500 )
      .start();

      new TWEEN.Tween( obj.children[0].material).to( {opacity: 0}, 500 )
      .start();
      new TWEEN.Tween(  obj.children[1].material).to( {opacity: 0}, 500 )
      .start();

      new TWEEN.Tween( obj.children[0].position).to( {z: -200}, 500 )
      .start();
      new TWEEN.Tween( obj.children[1].position).to( {z: -200}, 500 )
      .start();


      this.updateView();



      setTimeout(function (obj) {
        scene.remove(obj);
      }, 1000, obj);


    }
    this.killDeck = function () {

      for (var i in this.cards) {
        this.removeCard(i);
      }

      this.cards = [];

      this.updateView();


    }

    this.updateDeck = function (d) {
      if (Object.equals(this.deckobj, d)) return;
      this.deckobj = d;

      this.killDeck();


      for (var i in d.cards) {
        var found = false;

        for (var j in this.cards) {
          if (this.cards[j].data.name == d.cards[i].name) {
            this.cards[j].count++;
            deck.cards[j].object.children[1].material = cardMultipleMaterials[this.cards[j].count].clone();
            found = true;
          }
        }

        if (!found) this.addCard(d.cards[i]);
      }

    }

    this.addCard = function (id) {
      var c = this.cards[this.cards.length] = new Card(id)
      //this.animateTo(c, {x:640, y:-200}, 0.3, {x: 1.5, y: 0, z: 0},  0);
      c.object.position.set(640, -200, 0);
      c.object.rotation.set(1.5, 0, 0);
      c.object.scale.set(0.2, 0.2, 0.2);

      scene.add(c.object);
      this.updateView();
    }


  }

  this.view = "hidden";
  this.cards = [];
  this.deckobj = {};
  // for (var i in newcards) {
  //   this.cards[i] = new Card(newcards[i]);
  //   scene.add( this.cards[i].object);
  //
  //
  //   //var x = (1280/(newcards.length+1))*(parseInt(i)+1);
  //
  //
  //
  // }

  this.updateView();

}

function Card (data) {
  var card = new function () {

  };

  card.data = data;
  card.count = 0;

  card.texture = THREE.ImageUtils.loadTexture( "img/cards/" + data.image );
  card.texture.minFilter = THREE.LinearMipMapNearestFilter;
  card.texture.magFilter = THREE.LinearFilter;
  card.material = new THREE.MeshPhongMaterial({map: card.texture, transparent: true, blending: THREE.NormalBlending, depthWrite: false});

  var geometry = new THREE.PlaneGeometry( 284, 393 );



  card.object = THREE.SceneUtils.createMultiMaterialObject( geometry, [card.material, cardMultipleMaterials[0].clone()] );


  return card;
}



function cardList(elem) {
  this.elem = elem;
  this.cards = [];
  this.list = [];


  this.updateList = function (list) {
    if (!list.cards) return;
    var delta = getDelta(this.list, list.cards, Object.equals);
    console.log("Added:");
    console.log(delta.added);

    console.log("Deleted:");
    console.log(delta.deleted);

    for (var i in delta.added) {
         this.addCard(delta.added[i]);
    }

    for (var i in delta.deleted) {
         this.removeCard(delta.deleted[i]);
    }


    var sort = this.cards.slice(0);

    sort.sort(function (a, b) {
      var aa = parseInt(a.data.cost) || 0;
      var bb = parseInt(b.data.cost) || 0;

      if (aa == bb) return 0;
      if (aa > bb) return -1;
      if (aa < bb) return 1;
      return 0;
    });

    console.log("sort:");
    console.log(sort);

    for (var i in sort) {
      var count = 0;
      for (var j in list.cards) {
        if (sort[i].data.name == list.cards[j].name) count++;
      }
      sort[i].div.style.bottom = (i * 22 + 15) + "px";
      sort[i].div.style.transitionDelay = (i * 0.1) + "s";
      sort[i].setCount(count)
    }

  }

  this.addCard = function (card) {
    // for (var i in this.cards) {
    //   if (card.name == this.cards[i].data.name) return;
    // }

    var newcard = new cardListElement(card, this.elem.id);
    this.cards.push(newcard);
    this.list.push(card);
    $(this.elem).append(newcard.div);


  }

  this.removeCard = function (card) {
    for (var i in this.cards) {
      console.log(this.cards[i].data.name);
      if (card.name == this.cards[i].data.name) {
        //Remove card type
        $(this.cards[i].div).removeClass("show");

        setTimeout(function (div) {
          div.parentNode.removeChild(div);

        }, 3000, this.cards[i].div);

        this.list.splice(i, 1);
        this.cards.splice(i, 1);

        return;
      }
    }
  }


}

function cardListElement(card, id) {
  this.div = document.createElement("div");
  this.countSpan = document.createElement("div");
  this.manaSpan = document.createElement("div");
  this.div.className = "cardelement";


  this.countSpan.className = "countspan";
  this.manaSpan.className = "manaspan";
  this.manaSpan.innerHTML = card.cost || "0";
  $(this.div).html(card.name);

  $(this.div).html(card.name);
  this.div.appendChild(this.countSpan);
  this.div.appendChild(this.manaSpan);
  this.data = card;

  if (id == "decklist1") {
    this.div.style.backgroundImage = "URL(img/carditem.png), URL(img/cards/" + card.image + ")";
  } else {
    this.div.style.backgroundImage = "URL(img/carditem_right.png), URL(img/cards/" + card.image + ")";
  }




  this.setCount = function (nr) {
    if (nr > 1) {
      $(this.countSpan).addClass('show');
      $(this.countSpan).html("x" + nr);
    } else {
      $(this.countSpan).removeClass('show');

    }

    setTimeout (function (div) {
      $(div).addClass('show');
    }, 100, this.div);


  }


}



function mapFromArray(array, prop) {
    var map = {};
    for (var i=0; i < array.length; i++) {
        map[ array[i][prop] ] = array[i];
    }
    return map;
}

function getDelta(o, n, comparator)  {
    var delta = {
        added: [],
        deleted: [],
        changed: []
    };
    var mapO = mapFromArray(o, 'name');
    var mapN = mapFromArray(n, 'name');
    for (var id in mapO) {
        if (!mapN.hasOwnProperty(id)) {
            delta.deleted.push(mapO[id]);
        } else if (!comparator(mapN[id], mapO[id])){
            delta.changed.push(mapN[id]);
        }
    }

    for (var id in mapN) {
        if (!mapO.hasOwnProperty(id)) {
            delta.added.push( mapN[id] )
        }
    }
    return delta;
}



Object.equals = function( x, y ) {
  if ( x === y ) return true;
  // if both x and y are null or undefined and exactly the same

  if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
  // if they are not strictly equal, they both need to be Objects

  if ( x.constructor !== y.constructor ) return false;
  // they must have the exact same prototype chain, the closest we can do is
  // test there constructor.

  for ( var p in x ) {
    if ( ! x.hasOwnProperty( p ) ) continue;
    // other properties were tested using x.constructor === y.constructor

    if ( ! y.hasOwnProperty( p ) ) return false;
    // allows to compare x[ p ] and y[ p ] when set to undefined

    if ( x[ p ] === y[ p ] ) continue;
    // if they have the same strict value or identity then they are equal

    if ( typeof( x[ p ] ) !== "object" ) return false;
    // Numbers, Strings, Functions, Booleans must be strictly equal

    if ( ! Object.equals( x[ p ],  y[ p ] ) ) return false;
    // Objects and Arrays must be tested recursively
  }

  for ( p in y ) {
    if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
    // allows x[ p ] to be set to undefined
  }
  return true;
}
