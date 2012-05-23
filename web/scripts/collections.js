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
function shuffle(){
  //log('deck','inside shuffle');
  /* TODO ensure order array is always ready */
  var s=[];
  while(this.getAttrs().order.length)s.push(this.getAttrs().order.splice(Math.random()*this.getAttrs().order.length,1));
  while(s.length)this.getAttrs().order.push(s.pop());
  //return this.getAttrs().order;
}
function addCardsToTop(cardArray){
  /* TODO the deck collection should likely be the only collection to have addCardsToTop
   * other may have a similar function, but one that uses the positions found in the order array */
  log('deck.addCardsToTop','BEFORE cards size: '+this.getAttrs().cards.length+', order size: '+this.getAttrs().order.length);
  log('deck.addCardsToTop','new length of cards should be '+(this.getAttrs().cards.length+cardArray.length));
  for(var i in cardArray){
    log('deck.addCardsToTop','adding '+cardArray[i].id+' to bottom of cards');
    this.getAttrs().cards.push(cardArray[i]);
    log('deck.addCardsToTop','adding '+(this.getAttrs().cards.length-1)+' to top of order');
    this.getAttrs().order.unshift(this.getAttrs().cards.length-1);
  }
  log('deck.addCardsToTop','AFTER cards size: '+this.getAttrs().cards.length+', order size: '+this.getAttrs().order.length);
}
function drawCards(num){
  /* returns position of drawn cards in card array
   * this result should always be added to another card collection (hand, graveyard, etc.) */
  log('drawCards','drawing '+num+' cards');
  log('drawCards','first should be '+this.getAttrs().order[0]+', last should be '+this.getAttrs().order[(num-1)]);
  var result=this.getAttrs().order.splice(0,num);
  log('drawCards','result('+result.length+'): '+result);
  log('drawCards','order('+this.getAttrs().order.length+'): '+this.getAttrs().order);
  return result;
}
function playCard(cardPos){
  /* TODO put card referred to with cardPos onto the table and remove from this collection (usually hand) */
}
function setCardPos(){
  log('collections','setCardPos','hand.children size: '+hand.children.length);
  for(var i in hand.children){
    log('collections','setCardPos','\thand.children['+i+']: '+hand.children[i].getAttrs().name);
    /* TODO may not need the following if statement
     * the deck representation of the be getting modified, but the hand representation may still be the previous x/y values */
    log('collections','setCardPos','\thand.children['+i+'].x: '+(window.innerWidth-(window.innerWidth/hand.children.length*(hand.children.length-i))));
    //deck.getAttrs().cards[hand.getAttrs().order[i]].x=window.innerWidth-(window.innerWidth/hand.getAttrs().order.length/2*(hand.getAttrs().order.length-i));
    hand.children[i].getAttrs().x=window.innerWidth+cardWidth-(window.innerWidth/hand.children.length*(hand.children.length-i));
    //deck.getAttrs().cards[cardPos].x=window.innerWidth-window.innerWidth/7/2;
    log('collections','setCardPos','\thand.children['+i+'].y: '+(window.innerHeight-(window.innerHeight/4/2)));
    hand.children[i].getAttrs().y=(window.innerHeight-(window.innerHeight/4/2));
  }
  /*
  log('collections','setCardPos','drawing card layer');
  cardFrontLayer.draw();
  */
}
function resetCardPos(){
  for(var i in this.getAttrs().order){
    /* TODO re-align cards in the proper locations
     * easiest will be to follow order list
     * best would be to follow actual order of cards from left to right
     * this can be based on x value of each card (card with lowest x is first) */
    
  }
}