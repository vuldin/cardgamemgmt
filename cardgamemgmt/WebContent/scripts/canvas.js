var stage;
var layer;
var player;
var session;
var deck;
var scaleTimeout;
/* TODO remove color and colorNum variables */
var colors = ["red", "orange", "yellow", "green", "blue", "purple", "grey", "white", "black"];
function selectCard(shape){
  /* TODO add glowing border image */
  /* TODO
   * add card to new selectGroup collection
  */
  shape.getAttrs().selected=true;
  console.log('selected '+shape.getAttrs().id);
};
function deselectCard(shape){
  /* TODO remove glowing border image */
  shape.getAttrs().selected=false;
  console.log('deselected '+shape.getAttrs().id);
};
/*
function scaleCard(shape){
  // TODO create and use a scaled value inside the card JSON for this function (in place of selected)
  // not already selected
  if(shape.getAttrs().selected==false){
    // deselect any other selected card
    for(var i=0;i<layer.children.length;i++) {
      if(layer.children[i].getAttrs().selected==true) {
        previousSelected = layer.children[i];
        previousSelected.transitionTo({
          scale: {
            x: 1,
            y: 1
          },
          duration: 1,
          easing: 'strong-ease-out',
          callback: function(){
            console.log('deselected ' + previousSelected.getAttrs().id);
            previousSelected.setAttrs(previousSelected.getAttrs().selected=false);
          }
        });
      }
    }
    scaleTimeout = setTimeout(function(){
      shape.transitionTo({
        scale: {
          x: 1.2,
          y: 1.2
        },
        duration: 1,
        easing: 'strong-ease-out',
        callback: function(){
          console.log('selected ' + shape.getAttrs().id);
          shape.setAttrs(shape.getAttrs().selected=true);
        }
      });
    },300);
  }
  else {
    scaleTimeout = setTimeout(function(){
      shape.transitionTo({
        scale: {
          x: 1,
          y: 1
        },
        duration: 1,
        easing: 'strong-ease-out',
        callback: function(){
          console.log('deselected ' + shape.getAttrs().id);
          shape.setAttrs(shape.getAttrs().selected=false);
        }
      });
    },300);
  }
};
*/
function turnCard(shape){
  /* TODO split into turnCard and unturnCard (handle which gets called in dblclick function */
  shape.getAttrs().ready=false;
  console.log('turning');
  clearTimeout(scaleTimeout);
  if(shape.getAttrs().turned==false){
    console.log(shape.getAttrs().turned);
    shape.transitionTo({
      //rotationDeg: 45,
      rotation: Math.PI/2,
      duration: .5,
      easing: 'strong-ease-out',
      callback: function(){
        shape.setAttrs(shape.getAttrs().turned=true);
        shape.getAttrs().ready=true;
        console.log('turned');
      }
    });
  } else {
    console.log(shape.getAttrs().turned);
    shape.transitionTo({
      //rotationDeg: 0,
      rotation: 0,
      duration: .5,
      easing: 'strong-ease-out',
      callback: function(){
        shape.setAttrs(shape.getAttrs().turned=false);
        shape.getAttrs().ready=true;
        console.log('turned back');
      }
    });
  }
};
// createCard will only be called when a card needs to be displayed on screen
function createCard(cardJSON){
  var card = new Kinetic.Rect(cardJSON);
  /* TODO 
   * dynamically add below functions as needed?
   * these functions would need to be moved out of createCard
  */
  card.on('click', function(evt) {
    //scaleCard(evt.shape);
    if(!evt.shape.getAttrs().selected){
      selectCard(evt.shape);
      card.moveToTop();
      layer.draw();
    }
    else deselectCard(evt.shape);
  });
  card.on("dblclick dbltap", function(evt){
    /* TODO configure setTimeout/clearTimeout so click and dblclick/dbltap events work */
    /*
    layer.remove(card);
    layer.draw();
    */
    card.moveToTop();
    selectCard(evt.shape);
    turnCard(evt.shape);
  });
  card.on("dragstart", function(evt){
    card.moveToTop();
    selectCard(evt.shape);
    layer.draw();
  });
  card.on("dragmove", function(){
    document.body.style.cursor = "pointer";
  });
  card.on("mouseover", function(){
    document.body.style.cursor = "pointer";
    /* TODO show card popup */
  });
  card.on("mouseout", function(){
    document.body.style.cursor = "default";
  });
  layer.add(card);
}; // end createCard function
window.onload = function(){
  stage = new Kinetic.Stage({
    container: "container",
    width: window.innerWidth,
    height: window.innerHeight
  });
  layer = new Kinetic.Layer();
  /* TODO populate player and session variables with values from server */
  /* TODO player may be contained within session variable on server side */
  player = { id: 'PLAYERID' };
  session = { id: 'SESSIONID' };
  deck = {
    id: 'DECKID',
    name: 'deck1',
    player: player.id,
    session: session.id,
    cards: []
  };
  for(var i=0;i<200;i++){
    var colorNum = Math.floor(Math.random()*9);
    /* TODO dynamically set cardWidth and cardHeight */
    /* TODO set dragConstraints/dragBounds when in hand/inPlay areas */
    cardWidth = 70;
    cardHeight = 100;
    // create JSON representation of the cards that will be loaded with as much info as possible filled in
    var cardJSON = {
      id: (i+1),
      name: 'card'+(i+1),
      player: player.id,
      session: session.id,
      deck: deck.id,
      inPlay: true,
      selected: false,
      turned: false,
      flipped: false,
      ready: true, // is able to be interacted with (i.e. not in the middle of an animation)
      x:(Math.floor(Math.random()*(window.innerWidth-cardWidth))+cardWidth/2),
      y:(Math.floor(Math.random()*(window.innerHeight-cardHeight))+cardHeight/2),
      fill: colors[colorNum],
      stroke: "black",
      strokeWidth: 4,
      centerOffset: {
        x: cardWidth / 2,
        y: cardHeight / 2
      },
      draggable: true,
      /* TODO make card size dynamic accoding to window size */
      width: cardWidth,
      height: cardHeight,
      cornerRadius: 5
    };
    // send the JSON variable to the server as argument to the remote createCard (?) function
    //cardJSON = server.createCard(cardJSON); // server will return the JSON variable with remaining values filled in
    // add card to player's deck
    deck.cards.push(cardJSON);
    // create card object on the canvas
    createCard(cardJSON);
  }
  /*
  layer.on('click', function(evt) {
    //var scaleTimeout = null;
    //clearTimeout(scaleTimeout);
    //scaleTimeout = setTimeout(scaleCard(evt.shape),1000);
    scaleCard(evt.shape);
  });
  */
  /*
  layer.on('click', function(evt) {
    // select shapes by name
    var shapes = stage.get(".rectangle");
    for(var n = 0; n < shapes.length; n++) {
      var shape = shapes[n];
      shape.transitionTo({
        scale: {
          x: Math.random() * 2,
          y: Math.random() * 2
        },
        duration: 1,
        easing: 'elastic-ease-out'
      });
    }
  }, false);
  */
  stage.add(layer);
};
/*
var canvas = document.getElementsByTagName('CANVAS')[2];
var ctx = canvas.getContext("2d");
var rc = 0; // resize counter
var oc = 0; // orientiation counter 
var ios = navigator.userAgent.match(/(iPhone)|(iPod)/); // is iPhone
function resizeCanvas() {
  //inc resize counter
  rc++;
  if(ios) {
    //increase height to get rid off ios address bar
    document.getElementById('container').height($(window).height() + 60);
  }
  var width = document.getElementById('container').width;
  var height = document.getElementById('container').height;
  cheight = height - 20; // subtract the fix height
  cwidth = width;
  //set canvas width and height
  document.getElementsByTagName('CANVAS')[2].style.width=cwidth;
  document.getElementsByTagName('CANVAS')[2].style.height=cheight;
  //hides the WebKit url bar
  if(ios) {
    setTimeout(function() {
      window.scrollTo(0, 1);
    }, 100);
  }
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, cwidth, cheight);
  ctx.fillStyle = 'black';
  ctx.fillRect(10, 10, cwidth - 20, cheight - 20);
  //write number of orientation changes and resize events
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText('Orientiation changes: '+oc, cwidth/2, cheight/2);
  ctx.fillText('Resize events: '+rc, cwidth/2, cheight/2 + 10);
};

var resizeTimeout;
window.onresize = function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resizeCanvas, 100);
};
var otimeout;
window.onorientationchange = function() {
  clearTimeout(otimeout);
  otimeout = setTimeout(orientationChange, 50);
};
*/