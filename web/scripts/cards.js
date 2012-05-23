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
//var cardVar=null;
//var found=null;
var mousedownTimeout=null;
var cancelMouseup=null;
function mouseUp(thisCard){
    log('cards','mouseUp','clearing mousedownTimeout');
    clearTimeout(mousedownTimeout);
    if(!cancelMouseup){
      log('cards','mouseUp','on '+thisCard.getAttrs().name);
      if(!shiftDown){
        log('cards','mouseUp','found '+selectGroup.children.length+' other selected cards');
        // if shift isn't held down, handle all other cards
        for(var i in selectGroup.children){
          if(typeof previousSelected!='undefined'&&previousSelected==selectGroup.children[i]){
            log('cards','mouseUp','\tsetting selected to false for '+selectGroup.children[i].getAttrs().name);
            selectGroup.children[i].getAttrs().selected=false;
          }
          log('cards','mouseUp','\tbefore color/offset/blur: '+selectGroup.children[i].getShadowColor()+'/'+selectGroup.children[i].getShadowOffset().x+'/'+selectGroup.children[i].getShadowBlur());
          selectGroup.children[i].getShadowBlur();
          log('cards','mouseUp','\tremoving shadow from '+selectGroup.children[i].getAttrs().name);
          selectGroup.children[i].setShadowColor('undefined');
          selectGroup.children[i].setShadowOffset();
          selectGroup.children[i].setShadowBlur(5);
          log('cards','mouseUp','\tafter color/offset/blur: '+selectGroup.children[i].getShadowColor()+'/'+selectGroup.children[i].getShadowOffset().x+'/'+selectGroup.children[i].getShadowBlur());
        }
        log('cards','mouseUp','\tremoving '+selectGroup.children.length+' cards from selectGroup');
        selectGroup.removeChildren();
      } // finished handling all cards previously in selectGroup
      // handle this card
      log('cards','mouseUp','setting selected to true for '+thisCard.getAttrs().name);
      thisCard.getAttrs().selected=true;
      log('cards','mouseUp','adding '+thisCard.getAttrs().name+' to selectGroup');
      selectGroup.add(thisCard);
      log('cards','mouseUp','setting shadow on '+thisCard.getAttrs().name);
      log('cards','mouseUp','\tbefore color/offset/blur: '+thisCard.getShadowColor()+'/'+thisCard.getShadowOffset().x+'/'+thisCard.getShadowBlur());
      thisCard.setShadowColor('blue');
      thisCard.setShadowOffset(0,0);
      thisCard.setShadowBlur(5);
      log('cards','mouseUp','\tafter color/offset/blur: '+thisCard.getShadowColor()+'/'+thisCard.getShadowOffset().x+'/'+thisCard.getShadowBlur());
      log('cards','mouseUp','setting previousSelected to '+thisCard.getAttrs().name);
      previousSelected=thisCard;
      log('cards','mouseUp','moving '+thisCard.getAttrs().name+' to top of layer');
      thisCard.moveToTop();
      log('cards','mouseUp',selectGroup.children.length+' cards in selectGroup');
      cardFrontLayer.draw();
    }
    cancelMouseup=false;
    log('cards','mouseUp','complete');
} // end mouseUp
function clearSelection(){
  for(var i in selectGroup.children){
    if(typeof previousSelected!='undefined'&&previousSelected==selectGroup.children[i]){
      log('cards','clearSelection','setting selected to false for '+selectGroup.children[i].getAttrs().name);
      selectGroup.children[i].getAttrs().selected=false;
    }
    selectGroup.children[i].setShadowColor('');
    selectGroup.children[i].setShadowOffset('');
    selectGroup.children[i].setShadowBlur(5);
    cardFrontLayer.draw();
  }
  log('cards','clearSelection','removing '+selectGroup.children.length+' children');
  selectGroup.removeChildren();
  log('cards','clearSelection',selectGroup.children.length+' cards in selectGroup');
}
function createCard(cardPos){
  var card = new Kinetic.Rect(deck.getAttrs().cards[cardPos]);
  /* TODO dynamically add listener functions to each card as needed
   * these functions would need to be moved out of createCard */
  /* TODO should card be Kinetic.Text (instead of Rect)? */
  //console.log(card);
  //card.setText(card.name,card.width/2,card.height/2);
  //cardFrontLayer.getContext().fillText(cardJSON.name,cardJSON.x,(cardJSON.y-20));
  card.on('click',function(){});
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
  card.on('dragstart',function(){
    log('cards','dragStart','clearing mousedownTimeout');
    clearTimeout(mousedownTimeout);
  });
  card.on('dragend',function(){
  });
  card.on('dragmove',function(){
    document.body.style.cursor='pointer';
    this.setShadowColor('#3f3f3f');
    this.setShadowOffset(8,8);
  });
  card.on("mouseover",function(){
    document.body.style.cursor="pointer";
    /* TODO show card popup */
  });
  card.on("mouseout",function(){
    document.body.style.cursor="default";
  });
  card.on('mousedown touchstart',function(){
    log('card mousedown','mousedown on '+card.getAttrs().id);
    mousedownTimeout=setTimeout(function(){
      log('cards','mousedown','canceling mouseup');
      cancelMouseup=true;
      if(card.getAttrs().selected){
        log('cards','mousedown','deselecting '+card.getAttrs().id);
        card.getAttrs().selected=false;
      }
      for(var i in selectGroup.children)if(selectGroup.children[i]==card){
        log('cards','mousedown',card.getAttrs().id+' is found in selectGroup');
        selectGroup.remove(selectGroup.children[i]);
      }
      log('cards','mousedown','removing all shadows for '+card.getAttrs().id);
      card.setShadowColor('undefined');
      card.setShadowOffset();
      card.setShadowBlur(5);
      cardFrontLayer.draw();
    },1000);
  }); // end mousedown
  
  card.on('mouseup touchend',function(){
    mouseUp(card);
  });
  cardFrontLayer.add(card);
  return card;
}; // end createCard function