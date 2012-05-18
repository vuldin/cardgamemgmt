var collectionsDebug=false;
var cardsDebug=false;
var layoutDebug=false;
var setupDebug=true;
function log(origin,func,msg){
  if(collectionsDebug&&origin=='collections')console.log(origin+'.'+func+': '+msg);
  if(cardsDebug&&origin=='cards')console.log(origin+'.'+func+': '+msg);
  if(layoutDebug&&origin=='layout')console.log(origin+'.'+func+': '+msg);
  if(setupDebug&&origin=='setup')console.log(origin+'.'+func+': '+msg);
}