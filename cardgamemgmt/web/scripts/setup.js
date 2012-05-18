/*
 * Copyright 2012 Joshua Purcell <joshua.purcell@gmail.com>
 * 
 * This file is part of cardgamemgmt (CGM)
 * http://sourceforge.net/p/cardgamemgmt/wiki/Home/
 * 
 * CGM is free software: you can redistribute
 * it and/or modify it under the terms of the GNU General Public
 * License as published by the Free Software Foundation, either 
 * version 3 of the License, or (at your option) any later
 * version.
 * 
 * CGM is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public
 * License along with CGM. If not, see
 * http://www.gnu.org/licenses/.
 */
var stage;
var cardFrontLayer;
var player;
var session;
var deck;
var hand;
//var selectTimeout;
//var prevWinWidth;
//var prevWinHeight;
var previousSelected;
var cardWidthRatio=.06;
var cardHeightRatio=.18;
var selectGroup=new Kinetic.Group({
  /* TODO allow dragging of selectGroup via toggle */
  draggable: false
});
var cardWidth=null;
var cardHeight=null;
//var apple=navigator.userAgent.match(/(iPhone)|(iPod)/);
//var resizeTimeout=null;
//var orientationTimeout=null;
/* TODO remove color and colorNum variables */
var colors = ["red", "orange", "yellow", "green", "blue", "purple", "grey"];
var colorNum;
/* possibly add event handlers for dragging/interacting with group */
/* TODO add/remove select shadow to card */
/* TODO add/remove selectGroup shadow to card */
/* TODO find out how group movement behaves if restrictions are placed on one card in the group */
/* TODO is card.ready boolean needed? */
// createCard will only be called when a card needs to be displayed on screen
/*
function resizeCanvas(){
  var arr=null;
  // TODO test the correct functions work on apple devices
  //rc++;
  if(apple){
    //$("#container div").height($(window).height() + 60);
    arr=document.getElementsByTagName('div');
    for(var i=1;i<arr.length;i++){
      arr[i].style.height=(window.innerHeight+60)+'px';
    }
    //$("canvas").height($(window).height() + 60);
    arr=document.getElementsByTagName('canvas');
    for(var i=1;i<arr.length;i++){
      arr[i].height=(window.innerHeight+60);
    }
  }
  arr=document.getElementsByTagName('div');
  //console.log('div: '+arr.length);
  for(var i=1;i<arr.length;i++){
    //console.log('current div iteration: '+i);
    document.getElementsByTagName('div')[i].style.width=window.innerWidth+'px';
    document.getElementsByTagName('div')[i].style.height=window.innerHeight+'px';
  }
  arr=document.getElementsByTagName('canvas');
  log('setup','resizeCanvas','canvas: '+arr.length);
  for(var i=0;i<arr.length;i++){
    log('setup','resizeCanvas','current canvas iteration: '+i);
    //console.log('setting width/height to '+window.innerWidth+'/'+window.innerHeight);
    arr[i].width=window.innerWidth;
    arr[i].height=window.innerHeight;
    if(i<2){
      log('setup','resizeCanvas','set canvas to black');
      //canvasCtx=arr[i].getContext('2d');
      //canvasCtx.fillStyle = 'black';
      //canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      log('setup','resizeCanvas',stage);
    }
  }
  log('setup','resizeCanvas','resizing stage');
  stage.attrs.width=window.innerWidth;
  stage.attrs.height=window.innerHeight;
  //console.log('now should be '+window.innerWidth+'/'+window.innerHeight+': '+document.getElementsByTagName('div')[1].style.width+'/'+document.getElementsByTagName('div')[1].style.height);
  log('setup','resizeCanvas','now should be '+window.innerWidth+'/'+window.innerHeight+':');
  log('setup','resizeCanvas',document.getElementsByTagName('div')[1]);
  if(document.getElementsByTagName('canvas')[2])log('setup',document.getElementsByTagName('canvas')[2]);
  // hide webkit url bar
  if(apple){
    setTimeout(function(){
      window.scrollTo(0,1);
    }, 100);   
  }
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = 'black';
  ctx.fillRect(10, 10, width - 20, height - 20);
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText('Orientiation changes: '+oc, width/2, height/2);
  ctx.fillText('Resize events: '+rc, width/2, height/2+10);
  //cardFrontLayer.draw();
} // end resizeCanvas
function scaleObjects(){
  // resizeCanvas before scaleObjects
  // TODO test scaling shapes instead of the stage
  //if(window.innerWidth<window.innerHeight) stage.setScale(window.innerWidth/1920,window.innerWidth/1920);
  //else stage.setScale(window.innerHeight/1200,window.innerHeight/1200);
  log('setup','scaleObjects','innerWidth: '+window.innerWidth);
  log('setup','scaleObjects','innerHeight: '+window.innerHeight);
  stage.setScale(window.innerHeight/1200,window.innerHeight/1200);
  //stage.setScale(prevWinHeight/window.innerHeight,prevWinHeight/window.innerHeight);
  //for(var i=0;i<stage.getChildren();i++){
    //stage.getChildren()[i].setScale(window.innerWidth/1920,window.innerHeight/1200);
  //}
} // end scaleObjects()
function resizeCards(cardArr){
  // TODO update cardHeight/cardWidth multipliers based on actual ratios
  // TODO use size of layer instead of window (always call scaleObjects prior to resizeCards)
  if(window.innerWidth<window.innerHeight){
  //if(cardFrontLayer.getCanvas().width<cardFrontLayer.getCanvas().height){
    cardWidth = window.innerWidth*cardWidthRatio;
    cardHeight = cardWidth*1.428571429;
  } else {
    cardHeight = window.innerHeight*cardHeightRatio;
    cardWidth = cardHeight*.7;
  }
  // TODO will likely need to allow for multiple visible layers (currently hardcoded to first layer)
  log('setup','resizeCards','using previous window width/height ('+prevWinWidth+'/'+prevWinHeight+')');
  for(var i=0;i<cardArr.length;i++){
    var child=cardArr[i];
    var xRatio=child.getX()/prevWinWidth;
    var yRatio=child.getY()/prevWinHeight;
    child.setX(Math.round(window.innerWidth*xRatio));
    child.setY(Math.round(window.innerHeight*yRatio));
    child.attrs.width=cardWidth;
    child.attrs.height=cardHeight;
  }
} // end resizeCards
function orientationChange(){
  //oc++;
}
function setPrevWinSizes(){
  // TODO fix prevWinWidth/Height
  log('setup','setPrevWinSizes','saving window width/height ('+window.innerWidth+'/'+window.innerHeight+')');
  prevWinWidth=window.innerWidth;
  prevWinHeight=window.innerHeight;
}
// begin window functions
*/
window.onload = function(){
  stage = new Kinetic.Stage({
    container: "container",
    width: window.innerWidth,
    height: window.innerHeight
    /*
    width: 1920,
    height: 1200
    */
  });
  cardFrontLayer = new Kinetic.Layer();
  /* TODO populate player and session variables with values from server
   * server.js should handle creating the session (and player/opponent) objects */
  player = {id:'PLAYERID'};
  opponent = {id:'OPPONENTID'};
  session = {
    id:'SESSIONID',
    players:[player,opponent],
    admins:[]
  };
  /* TODO should deck be the same type of collection as other card collections (Kinetic group)?
   * deck doesn't need to be a kinetic group since it rarely (if ever) will need to be fully represented on the page
   * there may be benefits to having all card collections behave in the same way (regardless of if they appear fully on the page */
  deck = new Kinetic.Group({
    draggable: false,
    id: 'DECKID',
    name: 'deck1',
    owner: player.id,
    session: session.id,
    cards:[], /* TODO the deck object should only provide card information via server request */
    order:[],
    shuffle:shuffle,
    addCardsToTop:addCardsToTop,
    drawCards:drawCards,
    play:playCard
  });
  hand = new Kinetic.Group({
    draggable:false,
    id:'HANDID',
    name:'hand1',
    owner:player.id,
    session:session.id,
    order:[],
    play:playCard,
    setCardPos:setCardPos,
    resetCardPos:resetCardPos
  });
  /* TODO resizeCanvas tries to resize 3rd canvas before it exists */
  //resizeCanvas();

  //scaleObjects();
  //resizeCards(cardFrontLayer.getChildren());
  cardWidth = window.innerWidth*cardWidthRatio;
  cardHeight = cardWidth*1.428571429;
  var extra = 10;
  var minx=cardWidth/2+extra;
  var maxx=window.innerWidth-minx-extra;
  var miny=cardHeight/2+extra;
  var maxy=window.innerHeight-miny-extra;
  /* TODO remove card generating for loop
   * instead do the following steps:
   * 1. generate deck info (including json for each card)
   * 2. server will be responsible for shuffling deck and keeping track of card order/location
   * 3. createCard(server.drawCards(7)); */
  var cardAmount=60;
  var handAmount=7;
  var cardJSONarr=[];
  for(var i=0;i<cardAmount;i++){
    colorNum=Math.floor(Math.random()*7);
    /* TODO set dragConstraints/dragBounds when in hand/inPlay areas */
    // create JSON representation of the cards that will be loaded with as much info as possible filled in
    var cardJSON={
      id: (i+1),
      name: 'card'+(i+1), /* TODO this may need to be modified in order to best use the group.get() function */
      player: player.id,
      session: session.id,
      deck: deck.id,
      inPlay: true, // is this represented on the screen?
      selected: false, // is this the most recent one selected
      turned: false,
      flipped: false,
      ready: true, // is able to be interacted with (i.e. not in the middle of an animation)
      /*
      x:(minx+Math.round(Math.random()*(maxx-minx))),
      y:(miny+Math.round(Math.random()*(maxy-miny))),
      x:(window.innerWidth-((cardWidth+cardWidth*.2)*(cardAmount-1)))/2+(cardWidth+cardWidth*.2)*i,
      y:window.innerHeight-(window.innerHeight*.01+cardHeight/2),
      */
      fill: colors[colorNum],
      stroke: "black",
      strokeWidth: 1,
      centerOffset: {
        x: cardWidth / 2,
        y: cardHeight / 2
      },
      draggable: true,
      width: cardWidth,
      height: cardHeight,
      cornerRadius: 5
    };
    //console.log('( (windowWidth - handWidth) / 2 ) + cardWidth * i');
    //console.log((window.innerWidth-((cardWidth+cardWidth*.2)*(cardAmount-1)))/2+(cardWidth+cardWidth*.2)*i);
    // send the JSON variable to the server as argument to the remote createCard (?) function
    //cardJSON = server.createCard(cardJSON); // server will return the JSON variable with remaining values filled in
    /* all cards should start included in the associated player's deck
     * cards will move between the library/hand/discard/dead/etc groups throughout the game */
    cardJSONarr.push(cardJSON);
    log('setup','onload','created '+cardJSONarr.length+' cards so far');
  } // end card for loop
  log('setup','onload','creating '+cardJSONarr.length+' cards in deck '+deck.getAttrs().id);
  deck.addCardsToTop(cardJSONarr);
  log('setup','onload','created '+deck.getAttrs().cards.length+' cards in deck '+deck.getAttrs().id);
  log('setup','onload','shuffling...');
  deck.shuffle();
  log('setup',"onload",'drawing starting hand');
  var startingHand=deck.drawCards(handAmount);
  for(var cardPos in startingHand){
    hand.getAttrs().order.push(startingHand[cardPos]);
    hand.setCardPos(startingHand[cardPos]);
    //hand.getAttrs().cards.push(deck.getAttrs().cards[cardPos]);
    hand.add(createCard(startingHand[cardPos]));
  }
  //hand.add(createCard(deck.drawCards(7)));

  /* TODO see if there is a tap event to add to this listener */
  cardFrontLayer.on('click', function(evt) {
    /* TODO layer's click handler isn't called when the click occurs outside of the layer's shapes */
    log('setup','cardFrontLayer click','start');
    if(!evt.shape){
      for(var i=0;i<selectGroup.getChildren().length;i++){
        /* TODO remove shadows from cards */
      }
      log('setup','cardFrontLayer click','removing selected cards');
      selectGroup.removeChildren();
    }
  },false);
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
  cardFrontLayer.add(hand);
  cardFrontLayer.add(selectGroup);
  stage.add(cardFrontLayer);
  //setPrevWinSizes();
  }; // end onload function
/*
document.onkeyup(function(evt){
  if (evt.keyCode==27){
    // TODO clear selection when hitting escape
  }
});
*/
/*
window.onresize=function(){
  clearTimeout(resizeTimeout);
  // TODO add resizeCards
  resizeTimeout=setTimeout(function(){
    log('setup','onresize','resizing...');
    //alert('resizeCanvas');
    resizeCanvas();
    //alert('scaleObjects');
    scaleObjects();
    //alert('resizeCards');
    //resizeCards(cardFrontLayer.getChildren());
    //alert('setPrevWinSizes');
    setPrevWinSizes();
    //alert('draw card layer');
    cardFrontLayer.draw();
  }, 100);
};
window.onorientationchange=function(){
  // TODO test clearing resizeTimeout and calling onresize
  clearTimeout(orientationTimeout);
  clearTimeout(resizeTimeout);
  orientationTimeout=setTimeout(function(){
    log('setup','onorientationchange','orienting...');
    orientationChange();
    alert('resizeCanvas');
    resizeCanvas();
    alert('scaleObjects');
    scaleObjects();
    //alert('resizeCards');
    //resizeCards(cardFrontLayer.getChildren());
    alert('setPrevWinSizes');
    setPrevWinSizes();
    alert('draw card layer');
    cardFrontLayer.draw();
  },50);
};
*/
function sizing(){
  /* TODO sizing tasks:
   * during resize, scale the needed layers and resize stage, canvas, div and any other needed elements
   * size of canvas should probably be scaled down from 1920:1200 */
  // cardFrontLayer.setScale(.5,.5);cardFrontLayer.setX(stage.getWidth()/2);cardFrontLayer.setY(stage.getHeight()/2);cardFrontLayer.draw();
  //document.getElementsByTagName('canvas')[2].setAttribute("id","canvas");
  //document.getElementsByTagName('div')[1].style.width='';
  //document.getElementsByTagName('div')[1].style.height='';
  //console.log(document.getElementsByTagName('div')[1]);
  //var canvas = document.getElementById("canvas");
  //var ctx = document.getElementsByTagName('canvas')[2].getContext('2d');
  //console.log(ctx);
  //var rc = 0;  // resize counter
  //var oc = 0;  // orientiation counter

}; // end sizing
// run sizing once DOM is ready
//if (document.addEventListener) document.addEventListener("DOMContentLoaded", sizing, false);
//if (document.addEventListener) document.addEventListener("DOMContentLoaded", new function(){console.log('dom ready');}, false);