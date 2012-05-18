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
var found=null;
var mousedownTimeout=null;
var cancelMouseup=null;
function createCard(cardPos){
  var card = new Kinetic.Rect(deck.getAttrs().cards[cardPos]);
  /* TODO dynamically add listener functions to each card as needed
   * these functions would need to be moved out of createCard */
  /* TODO add text to cards */
  //console.log(card);
  //card.setText(card.name,card.width/2,card.height/2);
  //cardFrontLayer.getContext().fillText(cardJSON.name,cardJSON.x,(cardJSON.y-20));
  card.on('click', function() {});
  card.on("dblclick dbltap", function(){
    if(!card.getAttrs().turned){
      card.transitionTo({
        rotation: Math.PI/2,
        duration: .5,
        easing: 'strong-ease-out',
        callback: function(){
          card.setAttrs(card.getAttrs().turned=true);
        }
      });
    }
    else {
      card.transitionTo({
        rotation: 0,
        duration: .5,
        easing: 'strong-ease-out',
        callback: function(){
          card.setAttrs(card.getAttrs().turned=false);
        }
      });
    }
  });
  card.on("dragstart", function(){
    log('card dragstart','clearing mousedownTimeout');
    clearTimeout(mousedownTimeout);
    cardFrontLayer.draw();
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
  card.on('mousedown touchstart',function(){
    log('card mousedown','mousedown on '+card.getAttrs().id);
    mousedownTimeout=setTimeout(function(){
      log('card mousedown','canceling mouseup');
      cancelMouseup=true;
      if(card.getAttrs().selected){
        log('card mousedown','deselecting '+card.getAttrs().id);
        card.getAttrs().selected=false;
      }
      found=false;
      //for(var i=0;i<selectGroup.children.length;i++)if(selectGroup.children[i]==card){
      for(var i in selectGroup.children)if(selectGroup.children[i]==card){
        log('card mousedown',card.getAttrs().id+' is found in selectGroup');
        found=true;
      }
      if(found){
        log('card mousedown','removing '+card.getAttrs().id+' from selectGroup');
        selectGroup.remove(card);
      }
    },1000);
    
  });
  card.on('mouseup touchend',function(){
    log('card mouseup','clearing mousedownTimeout');
    clearTimeout(mousedownTimeout);
    if(!cancelMouseup){
      log('card mouseup','mouseup on '+card.getAttrs().id);
      if(!card.getAttrs().selected){
        //selectCard(card);
        //if(typeof previousSelected!='undefined'&&card!=previousSelected){
        if(typeof previousSelected!='undefined'){
          log('card mouseup','deselecting '+previousSelected.getAttrs().id);
          //deselectCard(previousSelected);
          previousSelected.getAttrs().selected=false;
        }
        log('card mouseup','selecting '+card.getAttrs().id);
        card.getAttrs().selected=true;
        log('card mouseup','setting previousSelected to '+card.getAttrs().id);
        previousSelected=card;
        found=false;
        for(var i=0;i<selectGroup.children.length;i++)if(selectGroup.children[i]==card){
          log('card mouseup',card.getAttrs().id+' is found in selectGroup');
          found=true;
        }
        if(!found){
          log('card mouseup','adding '+card.getAttrs().id+' to selectGroup');
          selectGroup.add(card);
        }
        log('card mouseup','selectGroup size: '+selectGroup.children.length);
        log('card mouseup','moving '+card.getAttrs().id+' to top of layer');
        card.moveToTop();
        cardFrontLayer.draw();
      }
    }
    log('card mouseup','reseting cancelMouseup');
    cancelMouseup=false;
  });
  cardFrontLayer.add(card);
  return card;
}; // end createCard function