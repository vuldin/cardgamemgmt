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
var rc=0; // resize counter
var oc=0; // orientation counter
var apple=navigator.userAgent.match(/(iPhone)|(iPod)/); // apple device
var resizeTimeout;
var otimeout;
$(function(){
  function orientationChange(){
    oc++;
  }
  function resizeCanvas(){
    /* TODO resizing works in firefox but not in webkit */
    log('layout','resizeCanvas',navigator.userAgent);
    if(typeof stage!='undefined'){
      /*
      log('layout','resizeCanvas','found stage');
      stage.getAttrs().width=$("#container").width();
      stage.getAttrs().height=$("#container").height();
      */
      var widthRatio=window.innerWidth/stage.getAttrs().width;
      var heightRatio=window.innerHeight/stage.getAttrs().height;
      log('layout','resizeCanvas','stage width/height ratio: '+widthRatio+'/'+heightRatio);
      if(widthRatio<heightRatio)stage.setScale(widthRatio,widthRatio);
      else stage.setScale(heightRatio,heightRatio);
    }
    if(typeof document.getElementsByClassName('kineticjs-content')[0]!='undefined'){
      log('layout','resizeCanvas','found wrapper div');
      document.getElementsByClassName('kineticjs-content')[0].style.width=$("#container").width()+'px';
      document.getElementsByClassName('kineticjs-content')[0].style.height=$("#container").height()+'px';
    }
    var canvasArr=document.getElementsByTagName("canvas");
    var ctx=null;
    log('layout','resizeCanvas','canvasArr length: '+canvasArr.length);
    for(var i in canvasArr){
      if(canvasArr[i] instanceof HTMLCanvasElement){
        //log('layout','resizeCanvas','this canvas: '+canvasArr[i]);
        ctx = canvasArr[i].getContext('2d');
        log('layout','resizeCanvas','this canvas context: '+ctx);
        if(apple){
          // increase height to get rid off ios address bar
          $("#container").height($(window).height() + 60)
        }
        var width = $("#container").width();
        var height = $("#container").height();
        //var cheight = height - 20; // subtract the fix height
        //var cwidth = width;
        //log('layout','resizeCanvas','width/height/cheight/cwidth: '+width+'/'+height+'/'+cwidth+'/'+cheight);
        /*
        canvasArr[i].width=cwidth;
        canvasArr[i].height=cheight;
        */
        canvasArr[i].width=width;
        canvasArr[i].height=height;
        // hide webkit bar
        if(apple){
          setTimeout(function(){
            window.scrollTo(0,1);
          },100);
        }
        /*
        ctx.fillStyle='green';
        ctx.fillRect(0,0,width,height);
        ctx.fillStyle='black';
        ctx.fillRect(10,10,width-20,height-20);
        ctx.fillStyle='white';
        ctx.textAlign='center';
        ctx.fillText('orientiation changes: '+oc,width/2,height/2);
        ctx.fillText('Resize events: '+rc,width/2,height/2+10);
        */
      }
    }
    rc++;
    if(typeof cardFrontLayer!='undefined')cardFrontLayer.draw();
  } // end resizeCanvas
  $(window).resize(function(){
    clearTimeout(resizeTimeout);
    resizeTimeout=setTimeout(resizeCanvas,200);
  });
  resizeCanvas();
  window.onorientationchange=function(){
    clearTimeout(otimeout);
    otimeout=setTimeout(orientationChange,50);
  }			  
});