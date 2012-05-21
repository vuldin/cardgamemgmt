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
