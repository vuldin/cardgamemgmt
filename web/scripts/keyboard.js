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
var shiftDown=false;
window.addEventListener('keydown',function(evt){
  if(evt.shiftKey==1){
    log('keyboard','keydown','shift down');
    shiftDown=true;
  }
},true);
window.addEventListener('keyup',function(evt){
  if (evt.keyCode==27){
    log('keyboard','keyup','clear selection');
    clearSelection();
  }
  if(evt.shiftKey==1){
    log('keyboard','keyup','shift up');
    shiftDown=false;
  }
},true);