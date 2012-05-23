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
var previousSelected;
var cardWidthRatio=.06;
var cardHeightRatio=.18;
var selectGroup=new Kinetic.Group({
  /* TODO allow dragging of selectGroup via toggle */
  draggable: true
});
var cardWidth=null;
var cardHeight=null;
/* TODO remove color and colorNum variables */
var colors = ["red", "orange", "yellow", "green", "blue", "purple", "grey"];
var colorNum=null;
/* possibly add event handlers for dragging/interacting with group */
/* TODO find out how group movement behaves if restrictions are placed on one card in the group */
/* TODO is card.ready boolean needed? */
// createCard will only be called when a card needs to be displayed on screen
// begin window functions
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
  cardWidth = window.innerWidth*cardWidthRatio;
  cardHeight = cardWidth*1.428571429;
  var extra = 10;
  var minx=cardWidth/2+extra;
  var maxx=window.innerWidth-minx-extra;
  var miny=cardHeight/2+extra;
  var maxy=window.innerHeight-miny-extra;
  /* TODO remove card generating for loop */
  var cardAmount=60;
  var handAmount=4;
  var cardJSONarr=[];
  for(var i=0;i<cardAmount;i++){
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
    // send the JSON variable to the server as argument to the remote createCard (?) function
    //cardJSON = server.createCard(cardJSON); // server will return the JSON variable with remaining values filled in
    /* all cards should start included in the associated player's deck (loaded from OPC? file)
     * pointers to a specific card's position in the deck will move between the library/hand/discard/dead/etc groups throughout the game */
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
  var newCard=null;
  colorNum=0;
  for(var i in startingHand){
    // add this card reference to hand
    hand.getAttrs().order.push(startingHand[i]);
    // set color to next from colors array
    newCard=createCard(startingHand[i]);
    newCard.setFill(colors[colorNum]);
    // add card UI object to hand
    hand.add(newCard);
    // find new x/y values for all cards in hand
    hand.setCardPos();
    // increment color
    if(colorNum<6)colorNum+=1;
    else colorNum=0;
  }
  //hand.add(createCard(deck.drawCards(7)));
  /* TODO see if there is a tap event to add to this listener */
  cardFrontLayer.on('click', function(evt){
    log('setup','cardFrontLayer click','');
    //console.log(evt.shape);
    if(!evt.shape){
      log('setup','cardFrontLayer click','clicked off a card');
      clearSelection();
    }
  },true);
  stage.on('click',function(evt){
    log('setup','stage click','');
    console.log(evt.shape);
  });
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
  }; // end onload function