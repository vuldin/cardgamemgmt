/*
 * Copyright 2012 Joshua Purcell <joshua.purcell@gmail.com>
 * 
 * This file is part of cardgamemgmt (CGM)
 * http://joshuapurcell.github.com/cardgamemgmt/
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
/* TODO server.js should be used when a card position needs to translated into an actual card
 * server.js will control access to a JSON object which lists the cards in a player's deck
 * each card collection should contain an array of positions that correlate to a card in the server's JSON object under the control of the collection */
function shuffle(){
  /* TODO ensure pos array is always ready */
  var s=[];
  while(this.getAttrs().pos.length)s.push(this.getAttrs().pos.splice(Math.random()*this.getAttrs().pos.length,1));
  while(s.length)this.getAttrs().pos.push(s.pop());
  //return this.getAttrs().order;
}
function addCardToTop(cardArray){
  /* input: array of integers representing position of each card being added to this collection */
  /* TODO should take posArray (instead of cardArray) as argument */
  log('deck.addCardsToTop','BEFORE cards size: '+this.getAttrs().cards.length+', pos size: '+this.getAttrs().pos.length);
  log('deck.addCardsToTop','new length of cards should be '+(this.getAttrs().cards.length+cardArray.length));
  for(var i in cardArray){
    log('deck.addCardsToTop','adding '+cardArray[i].id+' to bottom of cards');
    this.getAttrs().cards.push(cardArray[i]);
    log('deck.addCardsToTop','adding '+(this.getAttrs().cards.length-1)+' to top of pos');
    this.getAttrs().pos.unshift(this.getAttrs().cards.length-1);
  }
  log('deck.addCardsToTop','AFTER cards size: '+this.getAttrs().cards.length+', pos size: '+this.getAttrs().pos.length);
}
function drawCard(num){
  /* removes a certain number of cards from the deck and adds them to the hand
   * input: number of cards needing to be drawn
   * output: array of positions in the server's card JSON object where the drawn cards can be found */
  log('drawCards','drawing '+num+' cards');
  log('drawCards','first should be '+this.getAttrs().pos[0]+', last should be '+this.getAttrs().pos[(num-1)]);
  var result=this.getAttrs().pos.splice(0,num);
  log('drawCards','result('+result.length+'): '+result);
  log('drawCards','pos('+this.getAttrs().pos.length+'): '+this.getAttrs().pos);
  return result;
}
function addCard(posArray){
  
}
function removeCard(posArray){
	  
}
function playCard(posArray){
  /* TODO add given cards to inPlay collection, make these cards visible on the table, remove these cards from this collection (will usually be hand)
   * input: array of integers representing position of each card being added to this collection */
}
function discardCard(posArray){
  /* TODO remove these cards from this collection, add given cards to graveyard collection, remove these cards from window visibility
   * input: array of integers representing position of each card being added to this collection */
}
function exileCard(posArray){
  /* TODO remove cards from this collection and add exile collection, remove these cards from window visibility
   * input: array of integers representing position of each card being added to this collection */
}
function setCardLoc(){
  /* determines the x/y value of all cards in this collection based on size of collection's container on the window and number of cards in collection */
  /* TODO determine what part of screen to use for measurements
   * if cards in the hand collection are being positioned then cards need to be placed in hand section of window
   * currently hardcoded to hand collection and window width/height for determining individual card positions */
  /* TODO needs to handle individual cards
   * this can be done by sending a posArray as input
   * for each value in array passed in, find the location in the posArray for this location
   * set the x/y value of the card based on the location in this collection's posArray */
  log('collections','setCardPos','hand.children size: '+hand.children.length);
  for(var i in hand.children){
    log('collections','setCardPos','\thand.children['+i+']: '+hand.children[i].getAttrs().name);
    hand.children[i].getAttrs().x=window.innerWidth+cardWidth-(window.innerWidth/hand.children.length*(hand.children.length-i));
    hand.children[i].getAttrs().y=(window.innerHeight-(window.innerHeight/4/2));
  }
}
function resetCardPos(){
  /* TODO this function may not be needed */
  for(var i in this.getAttrs().pos){
    /* TODO re-align cards in the proper locations
     * easiest will be to follow order list
     * best would be to follow actual order of cards from left to right
     * this can be based on x value of each card (card with lowest x is first) */
    
  }
}