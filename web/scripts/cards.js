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
function mouseUp(card){
    log('cards','mouseUp','clearing mousedownTimeout');
    clearTimeout(mousedownTimeout);
    if(!cancelMouseup){
      log('cards','mouseUp','mouseup on '+card.getAttrs().id);
      //if(!card.getAttrs().selected){
        //if(typeof previousSelected!='undefined'&&card!=previousSelected){
        if(typeof previousSelected!='undefined'){
          log('cards','mouseUp','deselecting '+previousSelected.getAttrs().id);
          previousSelected.getAttrs().selected=false;
          log('cards','mouseUp','removing any shadow from '+previousSelected.getAttrs().id);
          previousSelected.setShadowColor('');
          previousSelected.setShadowOffset();
          previousSelected.setShadowBlur(5);
          //previousSelected.applyShadow();
          /* TODO check shift key status */
          if(false){
            log('cards','mouseUp','setting selectGroup shadow on '+card.getAttrs().id);
            previousSelected.setShadowColor('yellow');
          }
        }
        log('cards','mouseUp','selecting '+card.getAttrs().id);
        card.getAttrs().selected=true;
        log('cards','mouseUp','setting primary shadow on '+card.getAttrs().id);
        card.setShadowColor('blue');
        card.setShadowOffset(0,0);
        card.setShadowBlur(5);
        log('cards','mouseUp','setting previousSelected to '+card.getAttrs().id);
        previousSelected=card;
        /* TODO check for shift key pressed before adding to selectGroup */
        if(false){
          found=false;
          for(var i=0;i<selectGroup.children.length;i++)if(selectGroup.children[i]==card){
            log('cards','mouseUp',card.getAttrs().id+' is found in selectGroup');
            found=true;
          }
          if(!found){
            log('cards','mouseUp','adding '+card.getAttrs().id+' to selectGroup');
            selectGroup.add(card);
            //if(card.getAttrs().selected==false){
            log('cards','mouseUp','setting selectGroup shadow on '+card.getAttrs().id);
            card.setShadowColor('yellow');
            //card.setShadowOffset(1,1);
            card.setShadowBlur(15);
            //card.applyShadow();
            log('cards','mouseUp','color/offset/blur: '+card.getShadowColor()+'/'+card.getShadowOffset()+'/'+card.getShadowBlur());
          }
          log('cards','mouseUp','selectGroup size: '+selectGroup.children.length);
        } // end selectGroup changes
        log('cards','mouseUp','moving '+card.getAttrs().id+' to top of layer');
        card.moveToTop();
        cardFrontLayer.draw();
      //}
    }
    log('cards','mouseUp','reseting cancelMouseup');
    cancelMouseup=false;
} // end mouseUp
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
    this.moveToTop();
    log('cards','dragstart','clearing mousedownTimeout');
    clearTimeout(mousedownTimeout);
    cardFrontLayer.draw();
  });
  card.on('dragend',function(){
    log('cards','dragend','stopped');
    mouseUp(this);
  });
  card.on('dragmove',function(){
    document.body.style.cursor='pointer';
    log('cards','dragmove','setting selectGroup shadow on '+this.getAttrs().id);
    this.setShadowColor('#3f3f3f');
    this.setShadowOffset(8,8);
    //this.setShadowBlur(15);
    //card.applyShadow();
    //cardFrontLayer.draw();
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
      found=false;
      for(var i in selectGroup.children)if(selectGroup.children[i]==card){
        log('cards','mousedown',card.getAttrs().id+' is found in selectGroup');
        found=true;
      }
      if(found){
        log('cards','mousedown','removing '+card.getAttrs().id+' from selectGroup');
        selectGroup.remove(card);
      }
      log('cards','mousedown','removing any shadow on '+card.getAttrs().id);
      card.setShadowColor('');
      card.setShadowOffset();
      card.setShadowBlur(5);
      //card.applyShadow();
      cardFrontLayer.draw();
      //log('cards','mousedown','color/offset/blur: '+card.getShadowColor()+'/'+card.getShadowOffset()+'/'+card.getShadowBlur());
    },1000);
  }); // end mousedown
  
  card.on('mouseup touchend',function(){
    log('cards','mouseup','');
    mouseUp(this);
  }); // end mouseup
  cardFrontLayer.add(card);
  return card;
}; // end createCard function