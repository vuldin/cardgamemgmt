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
var collectionsDebug=false;
var cardsDebug=true;
var layoutDebug=false;
var setupDebug=false;
function log(origin,func,msg){
  if(collectionsDebug&&origin=='collections')console.log(origin+'.'+func+': '+msg);
  if(cardsDebug&&origin=='cards')console.log(origin+'.'+func+': '+msg);
  if(layoutDebug&&origin=='layout')console.log(origin+'.'+func+': '+msg);
  if(setupDebug&&origin=='setup')console.log(origin+'.'+func+': '+msg);
}